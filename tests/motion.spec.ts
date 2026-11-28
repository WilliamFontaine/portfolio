import type { Locator, Page } from '@playwright/test'
import { expect, test } from './fixtures'

const sky = (page: Page) => page.locator('#top [data-arrival]')
const reading = (page: Page) => page.locator('[data-reading]')
const box = async (locator: Locator) => (await locator.boundingBox())!

const timing = (page: Page, name: string, arrival = sky(page)) =>
  arrival.evaluate((element, name) => {
    const animation = element
      .getAnimations({ subtree: true })
      .find((animation) => (animation as CSSAnimation).animationName === name)
    const { duration, delay } = animation!.effect!.getComputedTiming()
    return { duration: duration as number, delay: delay! }
  }, name)

const states = (page: Page) =>
  sky(page).evaluate((element) =>
    element.getAnimations({ subtree: true }).map((animation) => animation.playState),
  )

const running = (page: Page) =>
  sky(page).evaluate((element) => element.getAnimations({ subtree: true }).length)

const frames = (page: Page) =>
  page.evaluate(
    () => new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done))),
  )

// Like Safari, WebKit only tabs to links with Option held.
const tab = (browserName: string) => (browserName === 'webkit' ? 'Alt+Tab' : 'Tab')

async function scrollSettled(page: Page) {
  let last = NaN
  await expect
    .poll(async () => last === (last = await page.evaluate(() => scrollY)), { intervals: [100] })
    .toBe(true)
}

async function settleArrival(page: Page) {
  await sky(page).scrollIntoViewIfNeeded()
  await expect.poll(() => running(page)).toBe(0)
}

// Scrolls until the given share of the hero line shows above the reading line, and returns that share.
async function showSkyAbove(page: Page, share: number) {
  const top = (await box(reading(page))).y
  const { y, height } = await box(sky(page))
  await page.mouse.wheel(0, y - (top - share * height))
  await scrollSettled(page)
  const after = await box(sky(page))
  return (top - after.y) / after.height
}

test.describe('with reduced motion', () => {
  test.use({ reducedMotion: 'reduce' })

  test('the final state shows at once and nothing moves', async ({ page, makeAxeBuilder }) => {
    await page.goto('/')
    for (const svg of await page.locator('#top svg[data-sky]').all()) {
      await expect(svg).toHaveCSS('clip-path', 'none')
    }
    const flow = page.locator('#flow-hero > g')
    await expect(flow).toHaveAttribute('transform', 'translate(0 520)')
    // WebKit does not map the transform attribute to the computed style: none means no CSS override.
    await expect(flow).toHaveCSS('transform', /^(none|matrix\(1, 0, 0, 1, 0, 520\))$/)
    await expect(page.locator('#top [data-sky-tower]')).toHaveCSS('transform', 'none')
    expect(await page.evaluate(() => document.getAnimations().length)).toBe(0)
    await expect(page.locator('[data-reveal]')).not.toHaveCount(0)
    await expect(page.locator('[data-pending]')).toHaveCount(0)
    await expect(reading(page)).toBeHidden()
    await expect(page.locator('html')).toHaveAttribute('data-settled')
    await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'auto')

    const button = page.getByRole('main').getByRole('link', { name: "M'écrire" })
    await button.hover()
    expect(await button.evaluate((link) => link.getAnimations().length)).toBe(0)
    expect((await makeAxeBuilder().analyze()).violations).toEqual([])
  })

  test('allowing motion after load places the reading line', async ({ page }) => {
    await page.goto('/')
    await expect(reading(page)).toBeHidden()
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await expect(reading(page)).toBeVisible()
    await expect(reading(page)).toHaveAttribute('data-ready')
    await expect(reading(page).locator('a[href="#top"]')).toHaveAttribute('data-passed')
  })
})

test.describe('with motion', () => {
  test.use({ reducedMotion: 'no-preference' })

  test.beforeEach(async ({ page }) => {
    await page.clock.install()
  })

  for (const [width, duration] of [
    [1440, 1400],
    [390, 980],
  ] as const) {
    test(`the arrival follows the motion tokens and ends at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.goto('/')
      expect(await timing(page, 'draw')).toEqual({ duration, delay: 150 })
      expect((await timing(page, 'rise')).delay).toBe(150 + duration / 2)
      await settleArrival(page)
      await expect(page.locator('#top svg[data-sky]').first()).toHaveCSS('clip-path', 'none')
    })
  }

  for (const width of [1440, 390]) {
    test(`the colophon tower note shows once the tower has risen at ${width}px`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.goto('/colophon/')
      // Inside the arrival, the note waits with the line on a phone.
      const arrival = page.getByRole('figure').locator('[data-arrival]')
      const rise = await timing(page, 'rise', arrival)
      expect((await timing(page, 'fade', arrival)).delay).toBeCloseTo(rise.delay + rise.duration)
    })
  }

  test('a link to a section lands on it, then scrolling turns smooth', async ({ page }) => {
    await page.goto('/#contact')
    const contact = page.locator('#contact')
    const landed = (await box(contact)).y
    expect(await page.evaluate(() => scrollY)).toBeGreaterThan(0)
    await expect(page.locator('html')).toHaveAttribute('data-settled')
    await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'smooth')
    await scrollSettled(page)
    expect((await box(contact)).y).toBe(landed)
  })

  test('the reading line is decorative and its stages stay out of the tab order', async ({
    page,
  }) => {
    await page.goto('/')
    const line = reading(page)
    await expect(line).toBeVisible()
    await expect(line).toHaveAttribute('aria-hidden', 'true')
    const marks = line.locator('a')
    await expect(marks).toHaveCount(5)
    for (const mark of await marks.all()) {
      await expect(mark).toHaveAttribute('tabindex', '-1')
    }
  })

  test('a smooth jump across stages names only the furthest one', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')
    const line = reading(page)
    await expect(line).toHaveAttribute('data-ready')
    await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'smooth')
    // Frozen timers from here: only the scroll's own end can name a stage until runFor.
    await page.clock.pauseAt(Date.now() + 1000)
    await line.locator('a[href="#a-propos"]').click()
    await expect(page.locator('#a-propos')).toBeInViewport()
    await scrollSettled(page)
    await page.clock.runFor(150)
    await expect(line.locator('[data-say]')).toHaveCount(1)
    await expect(line.locator('[data-ping]')).toHaveCount(1)
    await expect(line.locator('a[href="#a-propos"]')).toHaveAttribute('data-say')
    for (const id of ['realisations', 'competences', 'a-propos']) {
      await expect(line.locator(`a[href="#${id}"]`)).toHaveAttribute('data-passed')
    }
  })

  for (const width of [360, 390, 1440]) {
    test(`stages stay at least 20px apart at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.goto('/')
      await expect(reading(page)).toHaveAttribute('data-ready')
      const xs = []
      for (const mark of await reading(page).locator('a').all()) xs.push((await box(mark)).x)
      for (const [index, x] of xs.slice(1).entries()) {
        expect(x - xs[index]!).toBeGreaterThanOrEqual(20)
      }
    })
  }

  test('a revealed card hovers at the fast duration without delay', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')
    const cards = ['Egenr', 'ComWave'].map((name) =>
      page.getByRole('article').filter({ has: page.getByRole('heading', { name }) }),
    )
    for (const card of cards) await expect(card).toHaveAttribute('data-pending')
    await cards[0]!.scrollIntoViewIfNeeded()
    for (const card of cards) {
      await expect(card).not.toHaveAttribute('data-pending')
      await expect(card).not.toHaveAttribute('data-in')
      await card.hover()
      await expect(card).toHaveCSS('transition-duration', '0.15s')
      await expect(card).toHaveCSS('transition-delay', '0s')
    }
  })

  test('the last footer link ends above the reading line', async ({ page }) => {
    await page.goto('/')
    await page.mouse.wheel(0, 20000)
    const link = page.getByRole('contentinfo').getByRole('link').last()
    await expect(reading(page)).toHaveAttribute('data-done')
    const top = (await box(reading(page))).y
    await expect
      .poll(async () => (await box(link)).y + (await box(link)).height)
      .toBeLessThanOrEqual(top)
  })

  test('the reading line never covers the keyboard focus', async ({ page, browserName }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')
    const top = (await box(reading(page))).y
    const focused = page.locator(':focus')
    for (const link of await page.getByRole('link').all()) {
      await page.keyboard.press(tab(browserName))
      await expect(link).toBeFocused()
      // WebKit drops a smooth focus scroll that starts while the previous one runs.
      await scrollSettled(page)
      await expect(focused).toBeInViewport()
      await expect
        .poll(async () => (await box(focused)).y + (await box(focused)).height)
        .toBeLessThanOrEqual(top)
    }
  })

  test.describe('captured', () => {
    test.use({ screenshots: true })

    for (const scheme of ['light', 'dark'] as const) {
      test(`final ${scheme} state passes axe`, async ({ page, browserName, makeAxeBuilder }) => {
        await page.emulateMedia({ colorScheme: scheme })
        await page.setViewportSize({ width: 1440, height: 900 })
        await page.goto('/')
        await settleArrival(page)
        expect((await makeAxeBuilder().analyze()).violations).toEqual([])
        await page.screenshot({ path: `screenshots/motion-final-${scheme}-${browserName}.png` })
      })
    }

    test('a stage leads to its section and names it once there', async ({ page, browserName }) => {
      await page.setViewportSize({ width: 1440, height: 900 })
      // Frozen timers: the name cannot clear before it is checked.
      await page.clock.pauseAt(Date.now() + 1000)
      await page.goto('/')
      const line = reading(page)
      await expect(line).toHaveAttribute('data-ready')
      const mark = line.locator('a[href="#competences"]')
      const name = mark.locator('span').last()
      await mark.click()
      await expect(page).toHaveURL('/#competences')
      await expect(page.locator('#competences')).toBeInViewport()
      await expect(mark).toHaveAttribute('data-passed')
      await page.clock.runFor(150)
      await expect(mark).toHaveAttribute('data-say')
      await page.mouse.move(0, 0)
      await expect(line.locator('[data-say]')).toHaveCount(1)
      await expect(name).toHaveCSS('opacity', '1')
      for (const other of await line.locator('a:not([data-say]) > span:last-child').all()) {
        await expect(other).toHaveCSS('opacity', '0')
      }
      await page.screenshot({ path: `screenshots/motion-stage-${browserName}.png` })
      await page.clock.runFor(1600)
      await expect(mark).not.toHaveAttribute('data-say')
      await expect(name).toHaveCSS('opacity', '0')
    })
  })
})

test.describe('on a phone', () => {
  // The script's first-frame pause needs real frames, which Playwright's fake clock turns into timers.
  test.use({ reducedMotion: 'no-preference', viewport: { width: 390, height: 900 } })

  test('the arrival waits until half the line shows above the reading line', async ({ page }) => {
    await page.goto('/')
    await expect.poll(() => states(page)).toEqual(['paused', 'paused', 'paused', 'paused'])
    const { height } = await box(sky(page))
    expect(await showSkyAbove(page, 0.3)).toBeLessThan(0.5)
    expect(900 - (await box(sky(page))).y).toBeGreaterThan(height / 2)
    await frames(page)
    expect(await states(page)).toEqual(['paused', 'paused', 'paused', 'paused'])
    expect(await showSkyAbove(page, 0.7)).toBeGreaterThanOrEqual(0.5)
    await expect.poll(() => running(page)).toBe(0)
  })

  test('turning motion off while the arrival waits never plays it and shows every block', async ({
    page,
  }) => {
    await page.goto('/')
    await expect.poll(() => states(page)).toEqual(['paused', 'paused', 'paused', 'paused'])
    await expect(page.locator('[data-pending]')).not.toHaveCount(0)
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await expect(page.locator('[data-pending]')).toHaveCount(0)
    await expect.poll(() => page.evaluate(() => document.getAnimations().length)).toBe(0)
    await sky(page).scrollIntoViewIfNeeded()
    await scrollSettled(page)
    expect(await running(page)).toBe(0)
    await expect(page.locator('#top svg[data-sky]').first()).toHaveCSS('clip-path', 'none')
  })

  test('turning motion off and on while the arrival waits never replays the old one', async ({
    page,
  }) => {
    await page.goto('/')
    await expect.poll(() => states(page)).toEqual(['paused', 'paused', 'paused', 'paused'])
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await expect.poll(() => running(page)).toBe(0)
    await sky(page).scrollIntoViewIfNeeded()
    await scrollSettled(page)
    expect(await running(page)).toBe(0)
  })
})

test.describe('flow mask', () => {
  test.use({ reducedMotion: 'no-preference', screenshots: true })

  for (const [width, height] of [
    [1440, 900],
    [2560, 1440],
  ] as const) {
    for (const share of [0.1, 0.5]) {
      test(`the gradient flows down from the crest at ${width}px, ${share * 100}% into the flow`, async ({
        page,
        browserName,
      }) => {
        await page.setViewportSize({ width, height })
        await page.goto('/')
        await settleArrival(page)
        // A fresh arrival, free of the script's pause and release, which run once per page.
        await page.emulateMedia({ reducedMotion: 'reduce' })
        await page.emulateMedia({ reducedMotion: 'no-preference' })
        await expect.poll(() => running(page)).toBe(4)
        const { delay, duration } = await timing(page, 'flow')
        const time = delay + duration * share
        const times = await sky(page).evaluate(async (element, time) => {
          const animations = element.getAnimations({ subtree: true })
          for (const animation of animations) {
            animation.pause()
            animation.currentTime = time
          }
          // WebKit paints a seeked frame late: wait for two frames before the capture.
          await new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done)))
          return animations.map((animation) => animation.currentTime)
        }, time)
        expect(times).toEqual([time, time, time, time])
        await sky(page).screenshot({
          path: `screenshots/motion-flow-${width}-${share * 100}-${browserName}.png`,
        })
      })
    }
  }
})

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false, reducedMotion: 'no-preference' })

  test('blocks show and the line draws whole', async ({ page }) => {
    await page.goto('/')
    const blocks = page.locator('[data-reveal]')
    await expect(blocks).not.toHaveCount(0)
    await expect(page.locator('[data-pending]')).toHaveCount(0)
    for (const block of await blocks.all()) await expect(block).toHaveCSS('opacity', '1')
    for (const svg of await page.locator('#top svg[data-sky]').all()) {
      await expect(svg).toHaveCSS('clip-path', 'none')
    }
  })
})
