import { expect, test } from './fixtures'

const widths = [360, 390, 768, 1280, 1440, 1920, 2560, 3440]

test.use({ reducedMotion: 'reduce' })

for (const width of widths) {
  test(`skylines keep their line visible, undistorted, tower centred at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    const skies = page.locator('svg[data-sky]')
    await expect(skies).toHaveCount(3)

    const boxes = await skies.evaluateAll((svgs) =>
      svgs.map((svg) => {
        const box = svg.getBoundingClientRect()
        const ctm = (svg as SVGSVGElement).getScreenCTM()
        return { width: box.width, height: box.height, a: ctm?.a, d: ctm?.d }
      }),
    )
    for (const { width: w, height: h, a, d } of boxes) {
      expect(261.08 * Math.max(w / 10800, h / 322) + 1).toBeLessThanOrEqual(h)
      expect(a).toBeGreaterThan(0)
      expect(a).toBe(d)
    }

    const tower = await page.locator('[data-sky-tower]').first().boundingBox()
    const sky = await skies.first().boundingBox()
    expect(tower!.y).toBeGreaterThanOrEqual(sky!.y)
    expect(tower!.y + tower!.height).toBeLessThanOrEqual(sky!.y + sky!.height)
    expect(Math.abs(tower!.x + tower!.width / 2 - (sky!.x + sky!.width / 2))).toBeLessThanOrEqual(1)
  })
}

for (const [scheme, top, end] of [
  ['light', 'rgb(46, 97, 72)', 'color(srgb 0.180392 0.380392 0.282353 / 0.06)'],
  [
    'dark',
    'color(srgb 0.513726 0.756863 0.627451 / 0.5)',
    'color(srgb 0.513726 0.756863 0.627451 / 0.03)',
  ],
] as const) {
  test(`${scheme} gradient and tower start at the design system opacity`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: scheme })
    await page.goto('/')
    await expect(page.locator('linearGradient > stop:nth-child(1)').first()).toHaveCSS('color', top)
    await expect(page.locator('linearGradient > stop:nth-child(2)').first()).toHaveCSS('color', end)
    await expect(page.locator('[data-sky-tower]').first()).toHaveCSS('color', top)
  })
}

test('fill skyline ids derive from its id prop', async ({ page }) => {
  await page.goto('/')
  for (const prefix of ['area', 'gradient', 'flow', 'soft']) {
    await expect(page.locator(`#${prefix}-hero`)).toHaveCount(1)
  }
})
