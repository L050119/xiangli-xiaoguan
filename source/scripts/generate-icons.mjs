import { chromium } from 'playwright-core'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const projectDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const browser = await chromium.launch({
  headless: true,
  executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  args: ['--no-sandbox'],
})

try {
  const page = await browser.newPage({ viewport: { width: 512, height: 512 }, deviceScaleFactor: 1 })
  for (const [source, output, size] of [
    ['public/icon.svg', 'public/icon-192.png', 192],
    ['public/icon.svg', 'public/icon-512.png', 512],
    ['public/icon-maskable.svg', 'public/icon-maskable-512.png', 512],
    ['public/icon.svg', 'public/apple-touch-icon.png', 180],
  ]) {
    const svg = await readFile(resolve(projectDirectory, source), 'utf8')
    await page.setViewportSize({ width: size, height: size })
    await page.setContent(`<style>html,body{margin:0;width:100%;height:100%;overflow:hidden}</style>${svg.replace('<svg ', `<svg width="${size}" height="${size}" `)}`)
    await page.locator('svg').screenshot({ path: resolve(projectDirectory, output) })
  }
} finally {
  await browser.close()
}
