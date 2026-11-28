import type { Locator } from '@playwright/test'
import { expect, test } from './fixtures'

const widths = [360, 390, 768, 1280, 1440, 1920, 2560, 3440]

test.use({ reducedMotion: 'reduce' })

const loneWord = (heading: Locator) =>
  heading.evaluate((element) => {
    const words: { text: string; bottom: number }[] = []
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT)
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      // U+202F glues « ? » and « ; » to their word, so it does not split words as \s would.
      for (const match of node.textContent!.matchAll(/[^ \n\u00a0]+/g)) {
        const range = document.createRange()
        range.setStart(node, match.index)
        range.setEnd(node, match.index + match[0].length)
        const rects = range.getClientRects()
        if (rects.length) words.push({ text: match[0], bottom: rects[rects.length - 1]!.bottom })
      }
    }
    const bottom = Math.max(...words.map((word) => word.bottom))
    const last = words.filter((word) => Math.abs(word.bottom - bottom) < 2)
    // A one-word sentence, such as « Écrivez-moi. », may stand on its own line.
    const sentence = /[.?!]$/.test(words.at(-2)?.text ?? '.')
    return last.length < 2 && !sentence ? `${element.textContent} → ${last[0]?.text}` : ''
  })

for (const [name, path, notFound] of [
  ['home', '/', false],
  ['colophon', '/colophon/', false],
  ['legal notice', '/mentions-legales/', false],
  ['404', '/inexistant/', true],
] as const) {
  test.describe(`${name} page`, () => {
    test.use({ notFound })

    for (const width of widths) {
      test(`no heading ends on a lone word at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 })
        await page.goto(path)
        const headings = page.locator('h1, h2, h3, h4').filter({ visible: true })
        const endings = []
        for (const heading of await headings.all()) endings.push(await loneWord(heading))
        expect(endings.filter(Boolean)).toEqual([])
      })
    }
  })
}
