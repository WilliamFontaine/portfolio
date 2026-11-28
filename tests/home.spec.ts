import type { Page } from '@playwright/test'
import { expect, test } from './fixtures'

const email = 'william.fontaine0308@gmail.com'
// innerText applies the label's uppercase transform, hence the case-insensitive patterns.
const label = (page: Page) =>
  page.locator('#top').getByText('Développeur full\u2011stack, web et mobile')

test('page title and description', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle('William Fontaine, développeur full-stack à Clermont-Ferrand')
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    "Je conçois et développe des logiciels métier, web et mobile, du besoin à la mise en production, puis j'en assure le suivi. Basé à Clermont-Ferrand.",
  )
})

test('every menu link leads to its section', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/')
  await expect(label(page)).toHaveText(
    /^développeur full\u2011stack, web et mobile · clermont-ferrand$/i,
    { useInnerText: true },
  )
  const header = page.getByRole('banner')
  const nav = page.getByRole('navigation', { name: 'Navigation principale' })
  for (const [name, id] of [
    ['Réalisations', 'realisations'],
    ['Compétences', 'competences'],
    ['À propos', 'a-propos'],
    ["M'écrire", 'contact'],
  ] as const) {
    await nav.getByRole('link', { name }).click()
    await expect(page).toHaveURL(`/#${id}`)
    const section = page.locator(`#${id}`)
    await expect(section).toBeInViewport()
    await expect
      .poll(async () => (await section.boundingBox())!.y - (await header.boundingBox())!.height)
      .toBeGreaterThanOrEqual(0)
  }
  await header.getByRole('link', { name: 'William Fontaine' }).click()
  await expect(page).toHaveURL('/#top')
  await expect(page.locator('#top')).toBeInViewport()
})

for (const width of [360, 390, 1440]) {
  for (const [id, name] of [
    ['terragree', 'TerrAgree · gestion forestière'],
    ['neogo', 'NEOGO · comparateur de trajets'],
  ] as const) {
    test(`/#${id} opened cold at ${width}px shows the article label under the header`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.goto(`/#${id}`)
      const label = page.locator(`#${id}`).getByText(name)
      await expect(label).toBeInViewport()
      const header = (await page.getByRole('banner').boundingBox())!
      await expect
        .poll(async () => (await label.boundingBox())!.y)
        .toBeGreaterThanOrEqual(header.y + header.height)
    })
  }
}

test('menu links offer a 44px target, as every other standalone link', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/')
  for (const link of await page.getByRole('navigation').getByRole('link').all()) {
    expect((await link.boundingBox())!.height).toBeGreaterThanOrEqual(44)
  }
})

for (const [width, lines] of [
  [360, ['terragree · gestion forestière', 'depuis janvier\u00a02026']],
  [390, ['terragree · gestion forestière', 'depuis janvier\u00a02026']],
  [768, ['terragree · gestion forestière · depuis janvier\u00a02026']],
] as const) {
  test(`a case label takes ${lines.length} line${lines.length > 1 ? 's' : ''} at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    const label = page.locator('#terragree').getByText('TerrAgree · gestion forestière')
    expect((await label.innerText()).toLowerCase().split('\n')).toEqual(lines)
    const lineHeight = parseFloat(await label.evaluate((p) => getComputedStyle(p).lineHeight))
    expect((await label.boundingBox())!.height).toBeCloseTo(lines.length * lineHeight, 0)
  })
}

test('mail, LinkedIn and Malt links reach their targets', async ({ page }) => {
  await page.goto('/')
  const mail = page.getByRole('link', { name: email })
  await expect(mail).toHaveAttribute('href', `mailto:${email}`)
  await expect(mail).toHaveText(email)
  await expect(page.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
    'href',
    'https://www.linkedin.com/in/william-fontaine',
  )
  await expect(page.getByRole('link', { name: 'Malt' })).toHaveAttribute(
    'href',
    'https://www.malt.fr/profile/williamfontaine',
  )
})

for (const width of [360, 390]) {
  test(`at ${width}px the header keeps the logo and the mail button, the label drops the city`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    const header = page.getByRole('banner')
    await expect(header.getByRole('navigation')).toHaveCount(0)
    await expect(header.getByRole('link')).toHaveText(['William Fontaine', "M'écrire"])
    await expect(label(page)).toHaveText(/^développeur full\u2011stack, web et mobile$/i, {
      useInnerText: true,
    })
  })
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

for (const [width, banner] of [
  [
    390,
    `
      - banner:
        - link "William Fontaine":
          - /url: "#top"
        - link "M'écrire":
          - /url: "#contact"
    `,
  ],
  [
    1440,
    `
      - banner:
        - link "William Fontaine":
          - /url: "#top"
        - navigation "Navigation principale":
          - link "Réalisations":
            - /url: "#realisations"
          - link "Compétences":
            - /url: "#competences"
          - link "À propos":
            - /url: "#a-propos"
          - link "M'écrire":
            - /url: "#contact"
    `,
  ],
] as const) {
  test(`header and footer aria snapshots at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    await expect(page.getByRole('banner')).toMatchAriaSnapshot(banner)
    await expect(page.getByRole('contentinfo')).toMatchAriaSnapshot(footer)
  })
}
