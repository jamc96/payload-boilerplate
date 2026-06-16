import { defineConfig, devices } from '@playwright/test'

import 'dotenv/config'

export default defineConfig({
  testDir: './tests/visual',
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  expect: {
    toHaveScreenshot: {
      pathTemplate:
        '{testDir}/../../references/playwright/{projectName}/{testFileName}/{arg}{ext}',
      maxDiffPixelRatio: 0.02,
      threshold: 0.25,
      animations: 'disabled',
    },
  },
  projects: [
    {
      name: 'desktop',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chromium',
        viewport: { width: 1280, height: 900 },
      },
    },
    {
      name: 'tablet',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chromium',
        viewport: { width: 800, height: 900 },
      },
    },
    {
      name: 'mobile',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chromium',
        viewport: { width: 375, height: 812 },
      },
    },
  ],
  webServer: {
    command: 'pnpm dev',
    reuseExistingServer: true,
    url: 'http://localhost:3000',
  },
})
