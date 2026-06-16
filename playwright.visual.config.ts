import { defineConfig, devices } from '@playwright/test'

import 'dotenv/config'

/** One worker per viewport project — batch specs use a single navigation per project. */
const localWorkers = Number(process.env.PLAYWRIGHT_VISUAL_WORKERS ?? 3)

export default defineConfig({
  testDir: './tests/visual',
  globalSetup: './tests/global/visualGlobalSetup.ts',
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : localWorkers,
  fullyParallel: true,
  timeout: 60_000,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  expect: {
    timeout: 15_000,
    toHaveScreenshot: {
      pathTemplate:
        '{testDir}/../../references/playwright/{projectName}/demo-home/{arg}{ext}',
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
    reuseExistingServer: !process.env.CI,
    url: 'http://localhost:3000',
  },
})
