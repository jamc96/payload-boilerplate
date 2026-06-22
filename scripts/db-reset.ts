import { execSync } from 'node:child_process'
import fs from 'node:fs'

import { getDatabaseUrl, getSqlitePath } from './db-path.js'

const dbPath = getSqlitePath(getDatabaseUrl())

if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath)
}

execSync('pnpm db:setup', { stdio: 'inherit' })
