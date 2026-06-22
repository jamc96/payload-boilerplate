import { defineConfig, devices } from '@playwright/test'

import 'dotenv/config'

const baseURL = 'http://localhost:3000'

const e2eEnv = {
  DATABASE_URL: 'file:./.e2e/payload.db',
  PAYLOAD_SECRET: 'test-secret-minimum-32-characters',
  NEXT_PUBLIC_SERVER_URL: baseURL,
  SEED_ADMIN_EMAIL: 'admin@payload-poc.test',
  SEED_ADMIN_PASSWORD: 'changeme-dev-only',
  SEED_ADMIN_NAME: 'Admin',
  SKIP_VISUAL_SEED: '1',
}

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests/e2e',
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    baseURL,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], channel: 'chromium' },
    },
  ],
  webServer: {
    command:
      'pnpm exec tsx tests/prepare-e2e-db.ts && pnpm build && pnpm start',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    env: {
      ...process.env,
      ...e2eEnv,
    },
  },
})
