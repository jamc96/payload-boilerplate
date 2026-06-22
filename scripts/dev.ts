import { execSync } from 'node:child_process'
import fs from 'node:fs'

import { getDatabaseUrl, getSqlitePath } from './db-path.js'

const dbPath = getSqlitePath(getDatabaseUrl())

if (!fs.existsSync(dbPath)) {
  execSync('pnpm db:setup', { stdio: 'inherit' })
} else {
  execSync('pnpm db:migrate', { stdio: 'inherit' })
}

execSync('cross-env NODE_OPTIONS=--no-deprecation next dev', { stdio: 'inherit' })
