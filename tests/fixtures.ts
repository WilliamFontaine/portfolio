import AxeBuilder from '@axe-core/playwright'
import { expect, test as base, type ConsoleMessage } from '@playwright/test'

export { expect }

export const test = base.extend<{
  cleanSession: void
  notFound: boolean
  makeAxeBuilder: () => AxeBuilder
}>({
  notFound: [false, { option: true }],
  makeAxeBuilder: async ({ page }, use) => {
    await use(() => new AxeBuilder({ page }))
  },
  cleanSession: [
    async ({ page, context, baseURL, browserName, notFound }, use) => {
      const origin = new URL(baseURL!).origin
      const blocked: string[] = []
      // The zone injects /cdn-cgi/ scripts, which the 'self' CSP lets through.
      await context.route(
        (url) => url.origin !== origin || url.pathname.startsWith('/cdn-cgi/'),
        (route) => {
          blocked.push(route.request().url())
          return route.abort()
        },
      )

      await use()

      // Chromium logs the 404 status of the main document itself as a console error.
      const isNotFoundDocument = (m: ConsoleMessage) =>
        notFound && m.location().url === page.url() && m.text().includes('status of 404')
      // Playwright's WebKit screenshots append a <style> to sync animations, which the CSP refuses.
      const isScreenshotStyle = (m: ConsoleMessage) =>
        browserName === 'webkit' &&
        m.text().startsWith('Refused to apply a stylesheet because its hash')
      const consoleMessages = await page.consoleMessages({ filter: 'all' })
      expect.soft(blocked).toEqual([])
      expect
        .soft(
          consoleMessages.filter(
            (m) =>
              ['error', 'warning'].includes(m.type()) &&
              !isNotFoundDocument(m) &&
              !isScreenshotStyle(m),
          ),
        )
        .toEqual([])
      expect.soft(await page.pageErrors({ filter: 'all' })).toEqual([])
      expect.soft(await context.cookies()).toEqual([])
    },
    { auto: true, box: true },
  ],
})
