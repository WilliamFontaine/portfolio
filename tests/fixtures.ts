import { expect, test as base } from '@playwright/test'

export { expect }

export const test = base.extend<{ cleanSession: void }>({
  cleanSession: [
    async ({ page, context, baseURL }, use) => {
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

      expect(blocked).toEqual([])
      expect(
        (await page.consoleMessages()).filter((m) => ['error', 'warning'].includes(m.type())),
      ).toEqual([])
      expect(await page.pageErrors()).toEqual([])
      expect(await context.cookies()).toEqual([])
    },
    { auto: true, box: true },
  ],
})
