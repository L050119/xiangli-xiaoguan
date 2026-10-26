import { chromium } from 'playwright-core'

const origin = process.argv[2] ?? 'http://127.0.0.1:4174/'
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined,
  args: ['--no-sandbox'],
})
const context = await browser.newContext({ viewport: { width: 390, height: 844 } })
const page = await context.newPage()
const runtimeErrors = []
page.on('pageerror', (error) => runtimeErrors.push(error.message))
page.on('console', (message) => {
  if (message.type() === 'error') runtimeErrors.push(message.text())
})

try {
  await page.goto(origin, { waitUntil: 'domcontentloaded' })
  await page.locator('.dish-row').first().waitFor()
  await page.waitForFunction(() => navigator.serviceWorker?.controller, null, { timeout: 15000 })
  await page.waitForFunction(async () => (await caches.keys()).includes('xiangli-pwa-v2'), null, { timeout: 15000 })

  const onlineState = await page.evaluate(async () => {
    const manifest = await fetch('./manifest.webmanifest').then((response) => response.json())
    const cache = await caches.open('xiangli-pwa-v2')
    const keys = await cache.keys()
    return {
      controlled: Boolean(navigator.serviceWorker.controller),
      manifestName: manifest.name,
      display: manifest.display,
      iconCount: manifest.icons.length,
      cachedRequestCount: keys.length,
      cachedImages: keys.filter((request) => request.url.includes('/images/')).length,
      dishImagesCached: keys.filter((request) => /scallion-noodles|sweet-sour-ribs|longjing-shrimp|duck-bamboo-soup|pork-rice|yellow-croaker|shrimp-ball-soup|osmanthus-rice-balls|osmanthus-oolong/.test(request.url)).length,
      menuCount: document.querySelectorAll('.dish-row').length,
    }
  })

  await context.setOffline(true)
  await page.reload({ waitUntil: 'domcontentloaded' })
  await page.locator('.dish-row').first().waitFor()
  const offlineState = await page.evaluate(async () => ({
    title: document.querySelector('h1')?.textContent,
    dishCount: document.querySelectorAll('.dish-row').length,
    loadedImages: [...document.querySelectorAll('.dish-photo')].filter((image) => image.complete && image.naturalWidth > 0).length,
    heroImageStatus: await fetch(getComputedStyle(document.querySelector('.store-hero')).backgroundImage.match(/url\("?([^"\)]+)/)?.[1]).then((response) => response.status),
    localImageStatus: await fetch('./images/scallion-noodles.jpg').then((response) => response.status),
  }))

  console.log(JSON.stringify({ onlineState, offlineState, runtimeErrors }, null, 2))
} finally {
  await browser.close()
}
