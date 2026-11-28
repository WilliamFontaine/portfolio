import type { Page } from '@playwright/test'
import { expect, test } from './fixtures'

const nbsp = '\u00a0'
const narrow = '\u202f'
const month =
  '(?<!\\p{L})(?:janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre|déc\\.)'
const unit = '(?:m|px|jours|degrés)(?!\\p{L})'

const mustBeNbsp: [string, RegExp][] = [
  ['month and year', new RegExp(`${month}[ ${narrow}]\\d{4}`, 'giu')],
  ['number and unit', new RegExp(`\\d[ ${narrow}]${unit}`, 'gu')],
  ['digit groups', new RegExp(`\\d[ ${narrow}]\\d`, 'g')],
  ['Et après.', new RegExp(`(?<!\\p{L})Et[ ${narrow}]après`, 'gu')],
  ['à and its next word', new RegExp(`(?<!\\p{L})[àÀ][ ${narrow}\\n]`, 'gu')],
]

const nbspAllowed = (before: string, after: string) =>
  after.startsWith(':') ||
  (/\d$/.test(before) && new RegExp(`^(?:\\d|${unit})`, 'u').test(after)) ||
  (new RegExp(`${month}$`, 'iu').test(before) && /^\d{4}/.test(after)) ||
  (/(?<!\p{L})Et$/u.test(before) && after.startsWith('après')) ||
  /(?<!\p{L})[àÀ]$/u.test(before)

function errorsIn(text: string) {
  const errors: string[] = []
  const report = (rule: string, index: number) =>
    errors.push(`${rule}: «${text.slice(Math.max(0, index - 20), index + 20)}»`)
  for (const m of text.matchAll(/[\u2013\u2014]/g)) report('em or en dash', m.index)
  for (const m of text.matchAll(/full-stack/gi)) report('U+002D in full-stack', m.index)
  for (const m of text.matchAll(/[?;]/g)) {
    if (text[m.index - 1] !== narrow) report(`no U+202F before ${m[0]}`, m.index)
  }
  for (const m of text.matchAll(/:/g)) {
    const ratio = /\d/.test(text[m.index - 1] ?? '') && /\d/.test(text[m.index + 1] ?? '')
    const url = text.startsWith('//', m.index + 1)
    if (!ratio && !url && text[m.index - 1] !== nbsp) report('no U+00A0 before :', m.index)
  }
  for (const [rule, re] of mustBeNbsp) {
    for (const m of text.matchAll(re)) report(`no U+00A0 in ${rule}`, m.index)
  }
  for (const m of text.matchAll(/\u00a0/g)) {
    if (!nbspAllowed(text.slice(0, m.index), text.slice(m.index + 1))) {
      report('unexpected U+00A0', m.index)
    }
  }
  for (const m of text.matchAll(/\u202f/g)) {
    if (!/[?;]/.test(text[m.index + 1] ?? '')) report('unexpected U+202F', m.index)
  }
  return errors
}

const visibleTexts = (page: Page) =>
  page.evaluate(() => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
    const texts: string[] = []
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      if (node.parentElement?.checkVisibility() && node.textContent?.trim()) {
        texts.push(node.textContent)
      }
    }
    return texts
  })

for (const [name, path, notFound] of [
  ['home', '/', false],
  ['colophon', '/colophon/', false],
  ['legal notice', '/mentions-legales/', false],
  ['banner', '/banniere/', false],
  ['404', '/inexistant/', true],
] as const) {
  test.describe(`${name} page`, () => {
    test.use({ notFound })

    for (const width of [390, 1440]) {
      test(`text follows the typographic rules at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 })
        await page.goto(path)
        expect((await visibleTexts(page)).flatMap(errorsIn)).toEqual([])
        for (const heading of await page.locator('h1, h2, h3, h4').all()) {
          await expect(heading).toHaveCSS('text-wrap-style', 'balance')
        }
        for (const paragraph of await page.locator('p, li, dd').all()) {
          await expect(paragraph).toHaveCSS('text-wrap-style', 'pretty')
        }
      })
    }
  })
}
