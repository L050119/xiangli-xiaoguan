import { chromium } from 'playwright-core'

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined,
  args: ['--no-sandbox'],
})
const runtimeErrors = []
const desktopContext = await browser.newContext({ viewport: { width: 1440, height: 1100 } })
const page = await desktopContext.newPage()
page.on('pageerror', (error) => runtimeErrors.push(error.message))
page.on('console', (message) => {
  if (message.type() === 'error') runtimeErrors.push(message.text())
})
page.on('response', (response) => {
  if (response.status() >= 400) runtimeErrors.push(`${response.status()} ${response.url()}`)
})

await page.goto('http://127.0.0.1:4173', { waitUntil: 'domcontentloaded' })
await page.locator('.dish-row').first().waitFor()
await page.waitForTimeout(1800)
await page.screenshot({ path: 'artifacts/desktop-1440.png', fullPage: true })

const desktopStart = await page.evaluate(() => ({
  title: document.title,
  store: document.querySelector('h1')?.textContent,
  dishRows: document.querySelectorAll('.dish-row').length,
  loadedPhotos: [...document.querySelectorAll('.dish-photo')].filter((image) => image.complete && image.naturalWidth > 0).length,
  scallionPhoto: document.querySelector('.dish-photo')?.getAttribute('src'),
  pageWidth: document.documentElement.scrollWidth,
}))

await page.locator('.dish-row:first-child .add-button').click()
const productDetailOpened = await page.locator('.dish-dialog').isVisible()
await page.locator('.option-pills button').nth(1).click()
await page.locator('.detail-add-row .checkout-button').click()
await page.locator('.dish-row:nth-child(2) .add-button').click()
const cartAfterAdd = await page.locator('.cart-item').count()
const selectedFlavor = await page.locator('.cart-item-copy small').first().innerText()
await page.locator('.cart-item:first-child .quantity-control button:nth-child(3)').click()
const quantityAfterPlus = await page.locator('.cart-item:first-child .quantity-control span').innerText()
await page.locator('.cart-item:first-child .quantity-control button:nth-child(1)').click()
const cartTotalAfterAdd = await page.locator('.cart-summary .summary-total strong').innerText()
await page.reload()
await page.locator('.dish-row').first().waitFor()
const cartAfterReload = await page.locator('.cart-item').count()
await page.locator('.cart-summary .checkout-button').click()
const checkoutOpened = await page.locator('.checkout-dialog').isVisible()
const checkoutHasNewCustomerDiscount = await page.locator('.checkout-total-line').innerText()
await page.locator('.checkout-dialog .place-order-button').click()
const successOpened = await page.locator('.success-dialog').isVisible()
await page.locator('.success-actions .checkout-button').click()
const orderCount = await page.locator('.order-card').count()
const orderStatus = await page.locator('.order-card-top > strong').first().textContent()
const orderValue = await page.locator('.order-card-bottom > strong').first().innerText()
await page.locator('.orders-dialog .icon-close').click()
await page.reload()
await page.locator('.dish-row').first().waitFor()
await page.locator('.top-actions .nav-item:nth-child(2)').click()
const persistedOrderCount = await page.locator('.order-card').count()
await page.locator('.orders-dialog .icon-close').click()
await page.locator('.store-switch').click()
await page.locator('.store-option:nth-child(2)').click()
const switchedStore = await page.locator('h1').textContent()
await page.locator('.category-tab:nth-child(2)').click()
const categoryRows = await page.locator('.dish-row').count()
await page.locator('.store-switch').click()
const availableStores = await page.locator('.store-option').count()
await page.locator('.store-dialog .icon-close').click()
await page.locator('.global-search input').fill('\u725b\u8089')
const searchRows = await page.locator('.dish-row').count()
await page.locator('.top-actions .profile-button').click()
const desktopProfileVisible = await page.locator('.profile-page').isVisible()
await page.screenshot({ path: 'artifacts/profile-desktop-1440.png', fullPage: true })

const mobileContext = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 1,
  isMobile: true,
  hasTouch: true,
})
const mobile = await mobileContext.newPage()
const mobileErrors = []
mobile.on('pageerror', (error) => mobileErrors.push(error.message))
await mobile.goto('http://127.0.0.1:4173', { waitUntil: 'domcontentloaded' })
await mobile.locator('.dish-row').first().waitFor()
await mobile.waitForTimeout(1000)
await mobile.screenshot({ path: 'artifacts/mobile-390.png', fullPage: true })
await mobile.setViewportSize({ width: 320, height: 720 })
const mobileLayout = await mobile.evaluate(() => ({
  viewportWidth: innerWidth,
  documentWidth: document.documentElement.scrollWidth,
  heroHeight: Math.round(document.querySelector('.store-hero').getBoundingClientRect().height),
  dishRows: document.querySelectorAll('.dish-row').length,
  cartBarVisible: Boolean(document.querySelector('.mobile-cart-bar')),
}))
await mobile.locator('.dish-row:nth-child(2) .add-button').click()
const mobileCartVisible = await mobile.locator('.mobile-cart-bar').isVisible()
await mobile.locator('.mobile-cart-count').click()
const mobileCartDialog = await mobile.locator('.mobile-cart-dialog').isVisible()
await mobile.locator('.mobile-cart-dialog .icon-close').click()
await mobile.locator('.mobile-tabbar button:nth-child(3)').click()
const mobileProfileVisible = await mobile.locator('.profile-page').isVisible()
const mobileTabbarVisible = await mobile.locator('.mobile-tabbar').isVisible()
await mobile.screenshot({ path: 'artifacts/profile-mobile-320.png', fullPage: true })
await mobile.locator('.profile-edit').click()
await mobile.locator('.address-dialog .form-field input').first().fill('滨江区星光大道 8 号')
await mobile.locator('.address-dialog .place-order-button').click()
const savedProfileAddress = await mobile.locator('.saved-address-copy strong').innerText()
const profileLayout = await mobile.evaluate(() => ({
  viewportWidth: innerWidth,
  documentWidth: document.documentElement.scrollWidth,
  sections: document.querySelectorAll('.profile-section').length,
}))

console.log(JSON.stringify({
  desktopStart,
  productDetailOpened,
  cartAfterAdd,
  selectedFlavor,
  quantityAfterPlus,
  cartAfterReload,
  cartTotalAfterAdd,
  checkoutOpened,
  checkoutHasNewCustomerDiscount,
  successOpened,
  orderCount,
  orderStatus,
  orderValue,
  persistedOrderCount,
  switchedStore,
  categoryRows,
  availableStores,
  searchRows,
  desktopProfileVisible,
  mobileLayout,
  mobileCartVisible,
  mobileCartDialog,
  mobileProfileVisible,
  mobileTabbarVisible,
  savedProfileAddress,
  profileLayout,
  runtimeErrors,
  mobileErrors,
}, null, 2))
await browser.close()
