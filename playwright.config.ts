import { defineConfig, devices } from '@playwright/test'

const baseURL = process.env['BASE_URL'] ?? 'http://127.0.0.1:8787'

export default defineConfig({
  testDir: 'tests',
  forbidOnly: !!process.env['CI'],
  reporter: [[process.env['CI'] ? 'github' : 'list'], ['html', { open: 'never' }]],
  use: { baseURL, trace: 'retain-on-failure' },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testIgnore: /finition\.spec\.ts/,
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      testMatch: /(motion|wrap)\.spec\.ts/,
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      testMatch: /(motion|wrap)\.spec\.ts/,
    },
    // Firefox and WebKit record at 25 fps at most: the frame-by-frame review runs in Chromium.
    ...[
      { width: 1440, height: 900 },
      { width: 390, height: 844 },
    ].map((size) => ({
      name: `finition-${size.width}`,
      default: false,
      testMatch: /finition\.spec\.ts/,
      outputDir: `screenshots/finition/videos-${size.width}`,
      use: {
        ...devices['Desktop Chrome'],
        viewport: size,
        video: { mode: 'on' as const, size, fps: 60 },
      },
    })),
  ],
  ...(process.env['BASE_URL']
    ? {}
    : {
        webServer: {
          command: 'pnpm build && pnpm serve',
          url: baseURL,
          timeout: 120000,
        },
      }),
})
