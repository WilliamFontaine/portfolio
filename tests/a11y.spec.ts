import { expect, test } from './fixtures'

const accent = { light: 'rgb(163, 62, 37)', dark: 'rgb(233, 134, 103)' }

for (const scheme of ['light', 'dark'] as const) {
  for (const width of [390, 1440]) {
    test(`no axe violation in ${scheme} at ${width}px`, async ({ page, makeAxeBuilder }) => {
      await page.emulateMedia({ colorScheme: scheme })
      await page.setViewportSize({ width, height: 900 })
      await page.goto('/')
      expect((await makeAxeBuilder().analyze()).violations).toEqual([])
    })

    test(`keyboard reaches every link in order with a visible focus in ${scheme} at ${width}px`, async ({
      page,
    }) => {
      await page.emulateMedia({ colorScheme: scheme })
      await page.setViewportSize({ width, height: 900 })
      await page.goto('/')
      const links = await page.getByRole('link').all()
      const island = await page.locator('.scheme-dark').getByRole('link').count()
      expect(island).toBeGreaterThan(0)
      for (const [index, link] of links.entries()) {
        await page.keyboard.press('Tab')
        await expect(link).toBeFocused()
        await expect(link).toHaveCSS('outline-style', 'solid')
        await expect(link).toHaveCSS('outline-width', '2px')
        await expect(link).toHaveCSS(
          'outline-color',
          index >= links.length - island ? accent.dark : accent[scheme],
        )
        await expect(link).toHaveCSS('border-radius', /^(6px|999px)$/)
      }
    })
  }
}

test('images carry their exact text alternatives, decorations are hidden', async ({ page }) => {
  await page.goto('/')
  for (const name of [
    'Portrait de William Fontaine',
    "Vue aérienne d'une forêt mêlant conifères et feuillus",
    "Vue depuis la fenêtre d'un train qui traverse un champ",
  ]) {
    await expect(page.getByRole('img', { name, exact: true })).toHaveCount(1)
  }
  await expect(page.locator('svg:not([aria-hidden="true"])')).toHaveCount(0)
})

test('each side project announces its stack on its logo group', async ({ page }) => {
  await page.goto('/')
  for (const [name, stack] of [
    ['Quoi Regarder', 'Spring Boot, Nuxt, PostgreSQL'],
    ['Egenr', 'Tauri, Nuxt, Spring Boot'],
    ['ComWave', 'Nuxt, NestJS, PostgreSQL, Redis'],
  ] as const) {
    const logos = page.getByRole('article').filter({ has: page.getByRole('heading', { name }) })
    await expect(logos.getByRole('img')).toHaveAccessibleName(stack)
  }
})

test('header logo is named William Fontaine', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('banner').getByRole('link').first()).toHaveAccessibleName(
    'William Fontaine',
  )
})

for (const width of [360, 390]) {
  test(`every link is at least 44px tall at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    for (const target of await page.locator('a, button').filter({ visible: true }).all()) {
      expect((await target.boundingBox())!.height).toBeGreaterThanOrEqual(44)
    }
  })
}
