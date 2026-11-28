import { expect, test } from './fixtures'

const widths = [360, 390, 768, 1280, 1440, 1920, 2560, 3440]
const alphaOf = (color: string) => Number(/(?:\/|rgba\(.*,)\s*([\d.]+)\)$/.exec(color)?.[1] ?? 1)

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

    const tower = await page.locator('[data-sky-tower]').evaluate((g) => {
      const box = g.getBoundingClientRect()
      const sky = g.closest('svg')!.getBoundingClientRect()
      return { box, sky }
    })
    expect(tower.box.top).toBeGreaterThanOrEqual(tower.sky.top)
    expect(tower.box.bottom).toBeLessThanOrEqual(tower.sky.bottom)
    expect(
      Math.abs(tower.box.x + tower.box.width / 2 - (tower.sky.x + tower.sky.width / 2)),
    ).toBeLessThanOrEqual(1)
  })
}

for (const [scheme, top, end] of [
  ['light', 1, 0.06],
  ['dark', 0.5, 0.03],
] as const) {
  test(`${scheme} gradient and tower start at the design system opacity`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: scheme })
    await page.goto('/')
    const color = (selector: string) =>
      page
        .locator(selector)
        .first()
        .evaluate((el) => getComputedStyle(el).color)

    expect(alphaOf(await color('linearGradient > stop:nth-child(1)'))).toBeCloseTo(top, 2)
    expect(alphaOf(await color('linearGradient > stop:nth-child(2)'))).toBeCloseTo(end, 2)
    expect(alphaOf(await color('[data-sky-tower]'))).toBeCloseTo(top, 2)
  })
}

test('fill skyline ids derive from its id prop', async ({ page }) => {
  await page.goto('/')
  for (const prefix of ['area', 'gradient', 'flow', 'soft']) {
    await expect(page.locator(`#${prefix}-hero`)).toHaveCount(1)
  }
})
