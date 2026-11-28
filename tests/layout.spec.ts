import type { Locator, Page } from '@playwright/test'
import { expect, test } from './fixtures'

const widths = [360, 390, 768, 1280, 1440, 1920, 2560, 3440]
const content = 1248

test.use({ reducedMotion: 'reduce' })

const margin = (width: number) => (width >= 1440 ? (width - content) / 2 : width >= 1024 ? 96 : 24)
const box = async (locator: Locator) => (await locator.boundingBox())!

async function loadImages(page: Page) {
  for (const image of await page.locator('img').all()) {
    await image.scrollIntoViewIfNeeded()
    await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.complete)).toBe(true)
  }
  await page.evaluate(() => window.scrollTo(0, 0))
}

for (const scheme of ['light', 'dark'] as const) {
  for (const width of widths) {
    test(`${scheme} layout holds at ${width}px`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: scheme })
      await page.setViewportSize({ width, height: 900 })
      await page.goto('/')

      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width)

      const side = margin(width)
      const header = page.getByRole('banner')
      expect((await box(header.getByRole('link').first())).x).toBe(side)
      const mail = header.getByRole('link', { name: "M'écrire" })
      expect((await box(mail)).x + (await box(mail)).width).toBeCloseTo(width - side, 0)
      for (const heading of await page.locator('main h1, main h2').all()) {
        expect((await box(heading)).x).toBe(side)
      }

      for (const band of [
        header,
        page.locator('#top [data-sky]').first(),
        page.locator('#competences'),
        page.locator('#contact'),
        page.locator('#contact [data-sky]'),
        page.getByRole('contentinfo'),
      ]) {
        expect(await box(band)).toMatchObject({ x: 0, width })
      }

      for (const paragraph of await page.locator('p').filter({ visible: true }).all()) {
        expect((await box(paragraph)).width).toBeLessThanOrEqual(640)
      }

      await loadImages(page)
      await page.screenshot({
        path: `screenshots/home-${scheme}-${width}.png`,
        fullPage: true,
      })
    })
  }
}

test('text sizes stop growing at 1440px', async ({ page }) => {
  const samples = page.locator('h1, h2, h3, h4, p, li, a, figcaption')
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/')
  const reference = await samples.evaluateAll((elements) =>
    elements.map((element) => getComputedStyle(element).fontSize),
  )
  for (const width of [1920, 2560, 3440]) {
    await page.setViewportSize({ width, height: 1440 })
    for (const [index, size] of reference.entries()) {
      await expect(samples.nth(index)).toHaveCSS('font-size', size)
    }
  }
})

test('hero keeps its height on a tall screen', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/')
  const hero = page.locator('#top')
  const { height } = await box(hero)
  await page.setViewportSize({ width: 1440, height: 2560 })
  await expect.poll(async () => (await box(hero)).height).toBe(height)
})

test('headline fits on three lines at 390px', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 })
  await page.goto('/')
  const headline = page.getByRole('heading', { level: 1 })
  const lineHeight = parseFloat(await headline.evaluate((h) => getComputedStyle(h).lineHeight))
  expect((await box(headline)).height).toBeLessThanOrEqual(3 * lineHeight)
})

test('NEOGO photo sits right of its text at 1440px', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/')
  const neogo = page.locator('#neogo')
  expect((await box(neogo.locator('figure'))).x).toBeGreaterThan(
    (await box(neogo.getByRole('heading', { level: 3 }))).x,
  )
})

for (const width of [360, 390]) {
  test(`photos come first at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    for (const id of ['#terragree', '#neogo']) {
      const article = page.locator(id)
      expect((await box(article.locator('figure'))).y).toBeLessThan(
        (await box(article.getByRole('heading', { level: 3 }))).y,
      )
    }
  })
}

for (const deviceScaleFactor of [2, 3]) {
  test.describe(`at density ${deviceScaleFactor}`, () => {
    test.use({ deviceScaleFactor })

    for (const width of [390, 1440]) {
      test(`photos and portrait pick a sharp, not oversized source at ${width}px`, async ({
        page,
      }) => {
        await page.setViewportSize({ width, height: 900 })
        await page.goto('/')
        await loadImages(page)
        const images = page.locator('picture img')
        await expect(images).toHaveCount(3)
        for (const image of await images.all()) {
          const { chosen, candidates } = await image.evaluate(async (img: HTMLImageElement) => {
            const source = new Image()
            source.src = img.currentSrc
            await source.decode()
            const srcset = img.parentElement!.querySelector('source')!.srcset
            return {
              chosen: source.naturalWidth,
              candidates: srcset.split(',').map((entry) => parseInt(entry.trim().split(' ')[1]!)),
            }
          })
          // Astro never upscales: the widest candidate is the widest the original allows.
          const needed = Math.min(
            (await box(image)).width * deviceScaleFactor,
            Math.max(...candidates),
          )
          expect(chosen).toBeGreaterThanOrEqual(Math.floor(needed))
          expect(chosen).toBeLessThanOrEqual(Math.min(...candidates.filter((w) => w >= needed)))
        }
      })
    }
  })
}
