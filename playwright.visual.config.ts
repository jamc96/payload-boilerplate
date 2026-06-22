import { defineConfig, devices } from '@playwright/test'

import 'dotenv/config'

const baseURL = 'http://localhost:3000'

/** One worker per viewport project — batch specs use a single navigation per project. */
const localWorkers = Number(process.env.PLAYWRIGHT_VISUAL_WORKERS ?? 3)

const visualServerEnv = process.env.CI
  ? {
      DATABASE_URL: 'file:./.e2e/payload.db',
      PAYLOAD_SECRET: 'test-secret-minimum-32-characters',
      NEXT_PUBLIC_SERVER_URL: baseURL,
      SEED_ADMIN_EMAIL: 'admin@payload-poc.test',
      SEED_ADMIN_PASSWORD: 'changeme-dev-only',
      SEED_ADMIN_NAME: 'Admin',
      SKIP_VISUAL_SEED: '1',
    }
  : undefined

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
    command: process.env.CI
      ? 'pnpm exec tsx tests/prepare-e2e-db.ts && pnpm build && pnpm start'
      : 'pnpm dev',
    reuseExistingServer: !process.env.CI,
    url: baseURL,
    timeout: process.env.CI ? 180_000 : undefined,
    env: visualServerEnv
      ? {
          ...process.env,
          ...visualServerEnv,
        }
      : undefined,
  },
})
