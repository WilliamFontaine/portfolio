import { readFile } from 'node:fs/promises'
import type { Locator, Page } from '@playwright/test'
import { expect, test } from './fixtures'

const widths = [360, 390, 768, 1280, 1440, 1920, 2560, 3440]
const nbsp = '\u00a0'
const box = async (locator: Locator) => (await locator.boundingBox())!

const pages = [
  {
    path: '/colophon/',
    title: 'Comment ce site est fait · William Fontaine',
    description:
      "La ligne des Puys calculée depuis le relief de l'IGN, la technique du site et ses contrôles de qualité.",
  },
  {
    path: '/mentions-legales/',
    title: 'Mentions légales · William Fontaine',
    description: 'Éditeur, hébergeur et données personnelles du site wfontaine.fr.',
  },
] as const

const header = {
  390: `
    - banner:
      - link "William Fontaine":
        - /url: /
      - link "M'écrire":
        - /url: /#contact
  `,
  1440: `
    - banner:
      - link "William Fontaine":
        - /url: /
      - navigation "Navigation principale":
        - link "Réalisations":
          - /url: /#realisations
        - link "Compétences":
          - /url: /#competences
        - link "À propos":
          - /url: /#a-propos
        - link "M'écrire":
          - /url: /#contact
  `,
}

const footer = `
  - contentinfo:
    - list:
      - listitem:
        - link "Comment ce site est fait":
          - /url: /colophon/
      - listitem:
        - link "Mentions légales":
          - /url: /mentions-legales/
`

const mains = {
  '/colophon/': `
    - main:
      - link "Retour à l'accueil":
        - /url: /
      - heading "Comment ce site est fait" [level=1]
      - figure
      - heading "La ligne des Puys" [level=2]
      - heading "La technique" [level=2]
      - heading "La qualité" [level=2]
      - paragraph:
        - link "GitHub":
          - /url: https://github.com/WilliamFontaine/portfolio
      - heading "Crédits" [level=2]
  `,
  '/mentions-legales/': `
    - main:
      - link "Retour à l'accueil":
        - /url: /
      - heading "Mentions légales" [level=1]
      - heading "Éditeur" [level=2]
      - definition:
        - link "william.fontaine0308@gmail.com":
          - /url: mailto:william.fontaine0308@gmail.com
      - heading "Hébergement" [level=2]
      - heading "Vos données" [level=2]
      - paragraph:
        - link "william.fontaine0308@gmail.com":
          - /url: mailto:william.fontaine0308@gmail.com
      - paragraph:
        - link "Comment ce site est fait":
          - /url: /colophon/
  `,
}

async function fields(page: Page) {
  const terms = await page.getByRole('term').allInnerTexts()
  const definitions = await page.getByRole('definition').allInnerTexts()
  return Object.fromEntries(terms.map((term, index) => [term, definitions[index]]))
}

for (const { path, title, description } of pages) {
  test(`${path} title and description`, async ({ page }) => {
    await page.goto(path)
    await expect(page).toHaveTitle(title)
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', description)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://wfontaine.fr${path}`,
    )
  })

  for (const width of [390, 1440] as const) {
    test(`${path} aria snapshot at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.goto(path)
      await expect(page.getByRole('banner')).toMatchAriaSnapshot(header[width])
      await expect(page.getByRole('main')).toMatchAriaSnapshot(mains[path])
      await expect(page.getByRole('contentinfo')).toMatchAriaSnapshot(footer)
    })
  }
}

test('colophon credits the relief, photos, fonts and icons', async ({ page }) => {
  await page.goto('/colophon/')
  expect(await fields(page)).toEqual({
    Relief: 'IGN, RGE ALTI, sous Licence Ouverte (Etalab 2.0)',
    Photos: 'Kristaps Ungurs et Lau Clrd, sur Unsplash',
    Polices: 'Space Grotesk et Manrope, sous licence SIL Open Font',
    Icônes: 'Phosphor (MIT), et Simple Icons (CC0) pour les logos',
  })
})

for (const [width, gap, beside] of [
  [768, 2, false],
  [1024, 0, true],
] as const) {
  test(`a legal field's value sits ${beside ? 'beside' : 'under'} its label at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/mentions-legales/')
    const label = await box(page.getByRole('term').filter({ hasText: 'SIREN' }))
    const value = await box(page.getByRole('definition').nth(2))
    expect(value.y === label.y).toBe(beside)
    expect(Math.max(0, value.y - (label.y + label.height))).toBe(gap)
  })
}

test('legal notice names the publisher, the host and the data processing', async ({ page }) => {
  await page.goto('/mentions-legales/')
  expect(await fields(page)).toEqual({
    Nom: 'William Fontaine, entrepreneur individuel',
    Siège: 'Appartement 2, 45 rue Alfred de Musset, 63000 Clermont-Ferrand',
    SIREN: `992${nbsp}983${nbsp}148`,
    SIRET: `992${nbsp}983${nbsp}148${nbsp}00022`,
    Contact: 'william.fontaine0308@gmail.com',
    Publication: 'William Fontaine, directeur de la publication',
    Hébergeur: 'Cloudflare, Inc., 101 Townsend Street, San Francisco, CA 94107, États-Unis',
    Téléphone: `+1${nbsp}650${nbsp}319${nbsp}8930`,
  })
  const data = page
    .locator('section')
    .filter({ has: page.getByRole('heading', { name: 'Vos données' }) })
  await expect(data.getByRole('paragraph')).toHaveCount(4)
  await expect(data.getByRole('paragraph').first()).toHaveText(
    "Ce site ne dépose aucun cookie, ne mesure pas l'audience et n'a pas de formulaire. Je ne tiens aucun journal des visites.",
  )
  await expect(data).toContainText(`il conserve jusqu'à 31${nbsp}jours les requêtes`)
})

test.describe('colophon line', () => {
  test.use({ reducedMotion: 'reduce' })

  for (const width of widths) {
    const [text, side] =
      width >= 1024
        ? [`Puy de Dôme (1${nbsp}465${nbsp}m) et sa tour`, 1]
        : [`Puy de Dôme, 1${nbsp}465${nbsp}m`, -1]

    test(`stays undistorted with its tower annotation beside the tower at ${width}px`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.goto('/colophon/')
      const figure = page.getByRole('figure')
      const sky = figure.locator('svg[data-sky]').first()
      const { width: w, height: h } = await box(sky)
      expect(w).toBe(width)
      expect(261.08 * Math.max(w / 10800, h / 322) + 1).toBeLessThanOrEqual(h)
      const [a, d] = await sky.evaluate((svg) => {
        const ctm = (svg as SVGSVGElement).getScreenCTM()!
        return [ctm.a, ctm.d]
      })
      expect(a).toBe(d)
      expect((await box(figure.locator('figcaption'))).width).toBe(Math.min(width, 1440))

      const tower = await box(figure.locator('[data-sky-tower]'))
      const centre = tower.x + tower.width / 2
      expect(Math.abs(centre - width / 2)).toBeLessThanOrEqual(1)
      const note = figure.getByText(text, { exact: true })
      await expect(note).toBeVisible()
      const { x, width: noteWidth, y, height } = await box(note)
      expect(Math.sign(x + noteWidth / 2 - centre)).toBe(side)
      const gap = Math.min(Math.abs(x - centre), Math.abs(x + noteWidth - centre))
      expect(Math.abs(gap - 12)).toBeLessThanOrEqual(1)
      expect(y + height / 2).toBeGreaterThanOrEqual(tower.y)
      expect(y + height / 2).toBeLessThanOrEqual(tower.y + tower.height)
    })
  }
})

test('/colophon without a slash redirects to /colophon/', async ({ request }) => {
  const response = await request.get('/colophon', { maxRedirects: 0 })
  expect(response.status()).toBe(307)
  expect(response.headers()['location']).toBe('/colophon/')
})

test.describe('banner page', () => {
  test.use({ colorScheme: 'dark' })

  test('is noindex, stays light and holds the banner and the share image', async ({ page }) => {
    await page.goto('/banniere/')
    await expect(page).toHaveTitle('Bannière LinkedIn · William Fontaine')
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex')
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0)

    const banner = page.getByRole('region', { name: 'Bannière LinkedIn' })
    expect(await box(banner)).toMatchObject({ width: 1584, height: 396 })
    await expect(banner).toHaveCSS('background-color', 'rgb(250, 246, 243)')
    await expect(banner.locator('svg[viewBox="0 0 24 24"]')).toHaveCount(9)

    const share = page.getByRole('region', { name: 'Image de partage' })
    expect(await box(share)).toMatchObject({ width: 1200, height: 630 })
    await expect(share).toHaveCSS('background-color', 'rgb(250, 246, 243)')
  })
})

test('no page links to the banner', async ({ page }) => {
  for (const path of ['/', '/colophon/', '/mentions-legales/']) {
    await page.goto(path)
    await expect(page.locator('a[href*="banniere"]')).toHaveCount(0)
  }
})

test('robots.txt is served as committed and disallows nothing', async ({ request }) => {
  const response = await request.get('/robots.txt')
  expect(response.status()).toBe(200)
  const body = await response.text()
  expect(body).toBe(await readFile('public/robots.txt', 'utf8'))
  expect(body).not.toMatch(/disallow/i)
})

test('home carries absolute share metadata and a Person JSON-LD', async ({ page }) => {
  await page.goto('/')
  const meta = (key: string) => page.locator(`meta[property="${key}"], meta[name="${key}"]`)
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://wfontaine.fr/',
  )
  await expect(meta('og:image')).toHaveAttribute('content', 'https://wfontaine.fr/og.png')
  await expect(meta('og:image:width')).toHaveAttribute('content', '1200')
  await expect(meta('og:image:height')).toHaveAttribute('content', '630')
  await expect(meta('og:image:alt')).toHaveAttribute(
    'content',
    'Du besoin à la mise en production. Et après. wfontaine.fr, au-dessus de la chaîne des Puys et de la tour du Puy de Dôme.',
  )
  await expect(meta('twitter:card')).toHaveAttribute('content', 'summary_large_image')

  const scripts = page.locator('script[type="application/ld+json"]')
  await expect(scripts).toHaveCount(1)
  const person = JSON.parse((await scripts.textContent())!)
  const job = await page
    .getByRole('complementary', { name: 'En bref' })
    .getByRole('paragraph')
    .nth(1)
    .textContent()
  expect(person).toEqual({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'William Fontaine',
    jobTitle: job,
    url: 'https://wfontaine.fr/',
    image: expect.stringMatching(/^https:\/\/wfontaine\.fr\/_astro\/.+/),
    sameAs: [
      'https://www.linkedin.com/in/william-fontaine',
      'https://www.malt.fr/profile/williamfontaine',
    ],
  })
  const image = await page.request.get(person.image.replace('https://wfontaine.fr', ''))
  expect(image.status()).toBe(200)
  expect(image.headers()['content-type']).toMatch(/^image\//)
})

test('the share image is served at 1200 by 630', async ({ request }) => {
  const response = await request.get('/og.png')
  expect(response.status()).toBe(200)
  const png = await response.body()
  expect([png.readUInt32BE(16), png.readUInt32BE(20)]).toEqual([1200, 630])
})

test.describe('not found', () => {
  test.use({ notFound: true })

  test('an unknown path answers 404 with the site page, noindex', async ({ page }) => {
    const response = await page.goto('/inexistant/')
    expect(response?.status()).toBe(404)
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex')
    await expect(page.getByRole('banner')).toMatchAriaSnapshot(header[1440])
    await expect(page.getByRole('main')).toMatchAriaSnapshot(`
      - main:
        - heading "Cette page n'existe pas" [level=1]
        - link "Retour à l'accueil":
          - /url: /
    `)
    await expect(page.getByRole('contentinfo')).toMatchAriaSnapshot(footer)
  })

  for (const [width, height] of [
    [390, 900],
    [2560, 1440],
  ] as const) {
    test(`the footer reaches the bottom of a ${width}x${height} window`, async ({ page }) => {
      await page.setViewportSize({ width, height })
      await page.goto('/inexistant/')
      const { y, height: footerHeight } = await box(page.getByRole('contentinfo'))
      expect(y + footerHeight).toBe(height)
    })
  }
})

test('/404 is noindex too', async ({ page }) => {
  await page.goto('/404')
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex')
})

test.describe('captured', () => {
  test.use({ reducedMotion: 'reduce' })

  for (const [name, path, notFound] of [
    ['colophon', '/colophon/', false],
    ['mentions', '/mentions-legales/', false],
    ['404', '/inexistant/', true],
    ['banniere', '/banniere/', false],
  ] as const) {
    test.describe(name, () => {
      test.use({ notFound })

      for (const scheme of ['light', 'dark'] as const) {
        for (const width of [390, 1440]) {
          test(`no axe violation in ${scheme} at ${width}px`, async ({ page, makeAxeBuilder }) => {
            await page.emulateMedia({ colorScheme: scheme })
            await page.setViewportSize({ width, height: 900 })
            await page.goto(path)
            expect((await makeAxeBuilder().analyze()).violations).toEqual([])
            await page.screenshot({
              path: `screenshots/${name}-${scheme}-${width}.png`,
              fullPage: true,
            })
          })
        }
      }
    })
  }
})
