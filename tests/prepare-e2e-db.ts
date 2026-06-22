import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const E2E_DIR = '.e2e'
const DB_PATH = path.join(E2E_DIR, 'payload.db')

const seedEnv: NodeJS.ProcessEnv = {
  ...process.env,
  DATABASE_URL: 'file:./.e2e/payload.db',
  PAYLOAD_SECRET: 'test-secret-minimum-32-characters',
  SEED_ADMIN_EMAIL: 'admin@payload-poc.test',
  SEED_ADMIN_PASSWORD: 'changeme-dev-only',
  SEED_ADMIN_NAME: 'Admin',
  NEXT_PUBLIC_SERVER_URL: 'http://localhost:3000',
}

fs.mkdirSync(E2E_DIR, { recursive: true })

if (fs.existsSync(DB_PATH)) {
  fs.unlinkSync(DB_PATH)
}

execSync('pnpm db:migrate', {
  env: seedEnv,
  stdio: 'inherit',
})

execSync('pnpm db:seed', {
  env: seedEnv,
  stdio: 'inherit',
})
