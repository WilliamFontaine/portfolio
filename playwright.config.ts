import { defineConfig, devices } from '@playwright/test'

const baseURL = process.env['BASE_URL'] ?? 'http://127.0.0.1:8787'

export default defineConfig({
  testDir: 'tests',
  forbidOnly: !!process.env['CI'],
  ...(process.env['CI'] ? { workers: 1 } : {}),
  reporter: [[process.env['CI'] ? 'github' : 'list'], ['html', { open: 'never' }]],
  use: { baseURL, trace: 'retain-on-failure' },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] }, testMatch: /motion\.spec\.ts/ },
    { name: 'webkit', use: { ...devices['Desktop Safari'] }, testMatch: /motion\.spec\.ts/ },
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
