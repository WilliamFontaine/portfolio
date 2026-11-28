import type { Page } from '@playwright/test'
import { expect, scrollToEnd, test } from './fixtures'

// Recordings for a frame-by-frame review of the motion, not checks: run with --project='finition-*'.
test.use({ reducedMotion: 'no-preference' })

// The reading line's scroll-driven animations never finish: only time-driven ones count.
const running = (page: Page) =>
  page.evaluate(
    () =>
      document
        .getAnimations()
        .filter((a) => a.timeline instanceof DocumentTimeline && a.playState === 'running').length,
  )
const still = { intervals: [100], timeout: 10000 }

for (const scheme of ['light', 'dark'] as const) {
  test.describe(scheme, () => {
    test.use({ colorScheme: scheme })

    test('home: arrival, then a full scroll', async ({ page }) => {
      await page.goto('/')
      await expect.poll(() => running(page), still).toBe(0)
      await scrollToEnd(page, () => expect.poll(() => running(page), still).toBe(0))
    })

    test('home: hovers', async ({ page }) => {
      await page.goto('/')
      const targets = [
        page.getByRole('navigation').getByRole('link'),
        page.locator('#top').getByRole('link'),
        page.locator('#realisations').getByRole('heading', { level: 4 }),
        page.locator('#realisations').getByRole('link'),
        page.locator('#contact').getByRole('link'),
        page.getByRole('contentinfo').getByRole('link'),
      ]
      for (const target of targets) {
        for (const element of await target.all()) {
          await element.scrollIntoViewIfNeeded()
          await element.hover()
          await expect.poll(() => running(page), still).toBe(0)
        }
      }
    })

    test('home: reading line stages', async ({ page }) => {
      await page.goto('/')
      // Below 768px the stages let the pointer through: the move then hovers nothing.
      for (const mark of await page.locator('[data-reading] a').all()) {
        const { x, y, width, height } = (await mark.boundingBox())!
        await page.mouse.move(x + width / 2, y + height / 2)
        await expect.poll(() => running(page), still).toBe(0)
      }
    })

    test('home: keyboard', async ({ page }) => {
      await page.goto('/')
      for (const link of await page.getByRole('link').all()) {
        await page.keyboard.press('Tab')
        await expect(link).toBeFocused()
        await expect.poll(() => running(page), still).toBe(0)
      }
    })

    for (const [name, path, notFound] of [
      ['colophon', '/colophon/', false],
      ['legal notice', '/mentions-legales/', false],
      ['404', '/inexistant/', true],
    ] as const) {
      test.describe(name, () => {
        test.use({ notFound })

        test('arrival, then a full scroll', async ({ page }) => {
          await page.goto(path)
          await expect.poll(() => running(page), still).toBe(0)
          await scrollToEnd(page, () => expect.poll(() => running(page), still).toBe(0))
        })
      })
    }
  })
}
