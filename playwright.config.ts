import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration for Shonen Ark
 * Comprehensive E2E testing setup for web and mobile
 */

export default defineConfig({
  // Test directory
  testDir: './tests/e2e',
  
  // Global test timeout (30 seconds)
  timeout: 30 * 1000,
  
  // Expect timeout for assertions (5 seconds)
  expect: {
    timeout: 5 * 1000,
  },

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI
  workers: process.env.CI ? 1 : undefined,

  // Reporter configuration
  reporter: process.env.CI ? [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/results.xml' }],
    ['github'],
  ] : [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/results.xml' }],
    ['list'],
  ],

  // Shared settings for all the projects below
  use: {
    // Base URL for tests
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000',

    // Browser settings
    headless: process.env.CI ? true : false,
    viewport: { width: 1280, height: 720 },
    
    // Collect trace when retrying the failed test
    trace: 'on-first-retry',
    
    // Record video for failed tests
    video: 'retain-on-failure',
    
    // Screenshot settings
    screenshot: 'only-on-failure',

    // Ignore HTTPS errors
    ignoreHTTPSErrors: true,

    // Global test context
    extraHTTPHeaders: {
      'Accept-Language': 'en-US,en;q=0.9',
    },
  },

  // Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testMatch: ['**/*.spec.ts', '**/*.test.ts'],
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      testMatch: ['**/*.spec.ts', '**/*.test.ts'],
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      testMatch: ['**/*.spec.ts', '**/*.test.ts'],
    },

    // Mobile testing
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
      testMatch: ['**/mobile.spec.ts', '**/user-flows.spec.ts'],
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
      testMatch: ['**/mobile.spec.ts', '**/user-flows.spec.ts'],
    },

    // Tablet testing
    {
      name: 'iPad',
      use: { ...devices['iPad Pro'] },
      testMatch: ['**/tablet.spec.ts', '**/user-flows.spec.ts'],
    },

    // API testing
    {
      name: 'api-tests',
      testMatch: ['**/api.spec.ts'],
      use: {
        // API tests don't need browser context
        headless: true,
      },
    },
  ],

  // Development server configuration
  webServer: process.env.CI
    ? undefined
    : {
        command: 'npm run dev',
        port: 3000,
        reuseExistingServer: !process.env.CI,
        timeout: 120 * 1000,
        env: {
          NODE_ENV: 'test',
          NEXT_PUBLIC_ENV: 'test',
        },
      },

  // Global setup and teardown
  globalSetup: require.resolve('./tests/global-setup.ts'),
  globalTeardown: require.resolve('./tests/global-teardown.ts'),

  // Test output directory
  outputDir: 'test-results/',

  // Whether to preserve output between runs
  preserveOutput: 'failures-only',

  // Maximum concurrent browser contexts
  fullyParallel: true,

  // Global test configuration
  metadata: {
    project: 'Shonen Ark',
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV || 'test',
  },
});
