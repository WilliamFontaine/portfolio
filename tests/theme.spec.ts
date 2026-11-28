import { expect, test } from '@playwright/test'

const background = (selector: string) => (page: import('@playwright/test').Page) =>
  page.locator(selector).evaluate((el) => getComputedStyle(el).backgroundColor)

for (const [scheme, body] of [
  ['light', 'rgb(250, 246, 243)'],
  ['dark', 'rgb(18, 14, 12)'],
] as const) {
  test(`${scheme} theme paints the tokens`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: scheme })
    await page.goto('/')
    expect(await background('body')(page)).toBe(body)
    expect(await background('.island')(page)).toBe('rgb(29, 24, 22)')
  })
}

test('utilities resolve from the tokens', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' })
  await page.goto('/')
  const colour = await page
    .locator('.text-accent')
    .first()
    .evaluate((el) => getComputedStyle(el).color)
  expect(colour).toBe('rgb(163, 62, 37)')
})

test('page loads two same-origin font preloads, no cookie, no console noise', async ({
  page,
  context,
}) => {
  const problems: string[] = []
  page.on('console', (m) => {
    if (['error', 'warning'].includes(m.type())) problems.push(m.text())
  })
  page.on('pageerror', (e) => problems.push(e.message))
  const origins = new Set<string>()
  page.on('request', (r) => origins.add(new URL(r.url()).origin))

  await page.goto('/')
  await page.waitForLoadState('networkidle')

  await expect(page.locator('link[rel=preload][as=font][href^="/_astro/"]')).toHaveCount(2)
  expect([...origins]).toEqual(['http://127.0.0.1:8787'])
  expect(await context.cookies()).toEqual([])
  expect(problems).toEqual([])
})
