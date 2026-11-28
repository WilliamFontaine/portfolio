import { expect, test } from './fixtures'

test('home serves the French document with a CSP meta tag', async ({ page }) => {
  const response = await page.goto('/')
  expect(response?.status()).toBe(200)
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr')
  await expect(page.locator('meta[http-equiv="content-security-policy"]')).toHaveAttribute(
    'content',
    /default-src 'self'/,
  )
})

test.describe('unknown path', () => {
  test.use({ notFound: true })

  test('answers 404 with the 404 page', async ({ page }) => {
    const response = await page.goto('/inexistant/')
    expect(response?.status()).toBe(404)
    await expect(page).toHaveTitle('Page introuvable · William Fontaine')
  })
})
