import { expect, test } from './fixtures'

test.use({ reducedMotion: 'reduce' })

const views = [
  ['home-390-light', '/', 390, 'light'],
  ['home-390-dark', '/', 390, 'dark'],
  ['home-1440-light', '/', 1440, 'light'],
  ['home-1440-dark', '/', 1440, 'dark'],
  ['colophon-1440-light', '/colophon/', 1440, 'light'],
  ['colophon-390-dark', '/colophon/', 390, 'dark'],
  ['legal-1440-light', '/mentions-legales/', 1440, 'light'],
  ['legal-390-light', '/mentions-legales/', 390, 'light'],
] as const

for (const [name, path, width, scheme] of views) {
  test(name, async ({ page }) => {
    await page.emulateMedia({ colorScheme: scheme })
    await page.setViewportSize({ width, height: 900 })
    await page.goto(path)
    await expect(page).toHaveScreenshot(`${name}.png`, { fullPage: true })
  })
}

test.describe('not found', () => {
  test.use({ notFound: true })

  test('404-390-dark', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' })
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/inexistant/')
    await expect(page).toHaveScreenshot('404-390-dark.png', { fullPage: true })
  })
})

test('banner share box', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/banniere/')
  await expect(page.getByLabel('Image de partage')).toHaveScreenshot('share-box.png')
})
