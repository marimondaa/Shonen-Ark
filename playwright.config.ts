import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30000,
  expect: { timeout: 15000 },
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000', headless: true, trace: 'retain-on-failure', screenshot: 'only-on-failure' },
  projects: [
    { name: 'chromium', testIgnore: '**/api.spec.ts', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', testIgnore: '**/api.spec.ts', use: { ...devices['Pixel 5'] } },
    { name: 'api', testMatch: '**/api.spec.ts' },
  ],
  webServer: process.env.PLAYWRIGHT_BASE_URL ? undefined : { command: 'npm run dev', url: 'http://localhost:3000', reuseExistingServer: !process.env.CI, timeout: 120000 },
});
