import { expect, test, type Page } from '@playwright/test'

const style = (
  page: Page,
  selector: string,
  property: 'backgroundColor' | 'color' | 'colorScheme',
) =>
  page
    .locator(selector)
    .first()
    .evaluate((el, p) => getComputedStyle(el)[p], property)

for (const [scheme, body] of [
  ['light', 'rgb(250, 246, 243)'],
  ['dark', 'rgb(18, 14, 12)'],
] as const) {
  test(`${scheme} theme paints the tokens`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: scheme })
    await page.goto('/')
    expect(await style(page, 'body', 'backgroundColor')).toBe(body)
    expect(await style(page, '.scheme-dark', 'backgroundColor')).toBe('rgb(29, 24, 22)')
  })
}

test('colour-scheme is light dark on the page and dark on the island', async ({ page }) => {
  await page.goto('/')
  expect(await style(page, 'html', 'colorScheme')).toBe('light dark')
  expect(await style(page, '.scheme-dark', 'colorScheme')).toBe('dark')
})

test('utilities resolve from the tokens', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' })
  await page.goto('/')
  expect(await style(page, '.text-accent', 'color')).toBe('rgb(163, 62, 37)')
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

  await expect(page.locator('link[rel=preload][as=font][href^="/_astro/"]')).toHaveCount(2)
  expect([...origins]).toEqual([new URL(page.url()).origin])
  expect(await context.cookies()).toEqual([])
  expect(problems).toEqual([])
})
