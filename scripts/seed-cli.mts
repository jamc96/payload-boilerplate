/**
 * CLI seed — run with: pnpm seed
 * Stop `pnpm dev` first if you hit SQLite lock errors.
 */
import 'dotenv/config'
import { createLocalReq, getPayload } from 'payload'
import config from '../src/payload.config.js'
import { seed } from '../src/endpoints/seed/index.js'

const payload = await getPayload({ config })

let user = (
  await payload.find({
    collection: 'users',
    limit: 1,
    overrideAccess: true,
  })
).docs[0]

if (!user) {
  user = await payload.create({
    collection: 'users',
    data: {
      email: 'admin@example.com',
      password: 'password',
    },
    overrideAccess: true,
  })
  payload.logger.info('Created admin@example.com / password')
}

const req = await createLocalReq({ user }, payload)
await seed({ payload, req })

payload.logger.info('Done. Restart dev server and open http://localhost:3000')
process.exit(0)
