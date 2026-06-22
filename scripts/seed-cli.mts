/**
 * CLI seed — run with: pnpm seed or pnpm db:seed
 *
 * After schema field renames or type changes:
 * 1. Stop `pnpm dev` (avoids SQLite lock)
 * 2. Run `pnpm db:reset` (recommended) or `pnpm seed:fresh`
 * 3. Restart dev and reload the admin
 *
 * Admin login: SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD (see .env.example)
 */
import 'dotenv/config'
import { createLocalReq, getPayload } from 'payload'
import config from '../src/payload.config.js'
import { ensureSeedAdminUser, getSeedAdminCredentials } from '../src/endpoints/seed/ensureAdminUser.js'
import { seed } from '../src/endpoints/seed/index.js'

const payload = await getPayload({ config })
const user = await ensureSeedAdminUser(payload)
const { email } = getSeedAdminCredentials()

payload.logger.info(`Seed admin ready: ${email} (password from SEED_ADMIN_PASSWORD or default)`)

const req = await createLocalReq({ user }, payload)
await seed({ payload, req })

payload.logger.info('Done. Restart dev server and open http://localhost:3000')
process.exit(0)
