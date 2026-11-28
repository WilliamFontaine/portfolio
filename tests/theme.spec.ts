import { expect, test } from './fixtures'

for (const [scheme, body, accent] of [
  ['light', 'rgb(250, 246, 243)', 'rgb(163, 62, 37)'],
  ['dark', 'rgb(18, 14, 12)', 'rgb(233, 134, 103)'],
] as const) {
  test(`${scheme} theme paints the tokens`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: scheme })
    await page.goto('/')
    await expect(page.locator('body')).toHaveCSS('background-color', body)
    for (const island of [page.locator('#contact'), page.getByRole('contentinfo')]) {
      await expect(island).toHaveCSS('background-color', 'rgb(29, 24, 22)')
    }
    await expect(page.getByText('Et après.')).toHaveCSS('color', accent)
  })
}

test('colour-scheme is light dark on the page and dark on the island', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('html')).toHaveCSS('color-scheme', 'light dark')
  for (const island of [page.locator('#contact'), page.getByRole('contentinfo')]) {
    await expect(island).toHaveCSS('color-scheme', 'dark')
  }
})

for (const [width, padding] of [
  [390, '65px'],
  [1440, '77px'],
] as const) {
  test(`anchors clear the header at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    await expect(page.locator('html')).toHaveCSS('scroll-padding-top', padding)
  })
}

for (const [reducedMotion, behavior] of [
  ['no-preference', 'smooth'],
  ['reduce', 'auto'],
] as const) {
  test(`scrolling is ${behavior} with ${reducedMotion} motion`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion })
    await page.goto('/')
    await expect(page.locator('html')).toHaveCSS('scroll-behavior', behavior)
  })
}

test('page loads two same-origin font preloads', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('link[rel=preload][as=font][href^="/_astro/"]')).toHaveCount(2)
})
