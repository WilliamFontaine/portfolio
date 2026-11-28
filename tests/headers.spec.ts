import { expect, test } from './fixtures'

const security = {
  'content-security-policy': "frame-ancestors 'none'",
  'x-content-type-options': 'nosniff',
  'referrer-policy': 'strict-origin-when-cross-origin',
  'permissions-policy': 'camera=(), microphone=(), geolocation=()',
  'strict-transport-security': 'max-age=31536000',
}

for (const [label, path, status] of [
  ['a page', '/', 200],
  ['the 404 page', '/inexistant/', 404],
  ['a redirect', '/colophon', 307],
] as const) {
  test(`${label} carries each security header once`, async ({ request }) => {
    const response = await request.get(path, { maxRedirects: 0 })
    expect(response.status()).toBe(status)
    const names = response.headersArray().map((header) => header.name.toLowerCase())
    for (const [name, value] of Object.entries(security)) {
      expect(names.filter((header) => header === name)).toHaveLength(1)
      expect(response.headers()[name]).toBe(value)
    }
  })
}

test('a fingerprinted asset is cached for a year', async ({ page, request }) => {
  await page.goto('/')
  const href = await page.locator('link[rel="stylesheet"]').getAttribute('href')
  expect(href).toMatch(/^\/_astro\//)
  const response = await request.get(href as string)
  expect(response.headers()['cache-control']).toBe('public, max-age=31536000, immutable')
})

test(
  'a page keeps the default revalidating cache',
  { tag: '@revalidation' },
  async ({ request }) => {
    const response = await request.get('/')
    expect(response.headers()['cache-control']).toBe('public, max-age=0, must-revalidate')
    expect(response.headers()['etag']).toBeTruthy()
  },
)

test('_headers is not served', async ({ request }) => {
  expect((await request.get('/_headers')).status()).toBe(404)
})
