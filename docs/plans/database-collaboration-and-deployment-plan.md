# Database collaboration & deployment plan

> **Goal:** One simple workflow so teammates share schema changes via git, get the same baseline dev data from seed, and deploy to production without dev/prod drift or interactive migration prompts.

> **Portable reference / AI prompt for other projects:** [payload-migration-workflow-prompt.md](../payload-migration-workflow-prompt.md) — full data flow, diagrams, file map, and copy-paste prompt.

---

## Problem (before this workflow)

| Layer | Old behavior | Issue |
|-------|--------------|-------|
| **Schema** | Dev push (implicit, local-only) | Teammates with different local DBs; CI build can hang on migration prompts |
| **Data** | `pnpm seed` / `pnpm seed:fresh` | Good content, but no standard order with schema |
| **E2E** | `pnpm dev` in webServer | Build-time `generateStaticParams` needs migrated schema |

**Root cause:** Schema was not fully version-controlled in git.

---

## Principles

1. **Schema lives in git** — migrations are the only way to change tables/columns.
2. **Data lives in seed** — demo admin, pages, and media come from `src/endpoints/seed/`; never commit `*.db`.
3. **Migrate is cheap** — `payload migrate` is a no-op when up to date; safe before every dev session and deploy.
4. **Seed runs sparingly** — first setup, explicit reset, or E2E prep — not on every `pnpm dev`.

---

## Target architecture

```
┌─────────────────────────────────────────────────────────────┐
│  Git (shared)                                               │
│  ├── src/collections/*, blocks, globals  ← schema intent    │
│  ├── src/migrations/*                    ← schema truth     │
│  └── src/endpoints/seed/                 ← baseline content │
└─────────────────────────────────────────────────────────────┘
         │                              │
         ▼                              ▼
   Local dev (payload.db)        Production DB
   E2E (.e2e/payload.db)
```

---

## Team workflow

### New developer (first clone)

```bash
pnpm install
cp .env.example .env
pnpm dev          # auto: migrate + seed (if no DB) → start server
```

Or explicitly: `pnpm db:setup && pnpm dev`

### Daily development

```bash
pnpm dev          # migrate (no-op if current) → start server
```

### Changing the schema (PR author)

1. Edit collection/field/block/global config
2. Commit — pre-commit hook runs `migrate:create` if no migration is staged
3. Review generated migration in `src/migrations/`
4. Commit **schema changes and migration file(s) together**

### Stuck / weird local state

```bash
pnpm db:reset     # wipe local DB, migrate, seed
```

---

## Seed scope

Baseline demo content lives in `src/endpoints/seed/` (invoked by `scripts/seed-cli.mts`):

- Admin user (`SEED_ADMIN_*` env vars)
- Demo home layout, header/footer globals, media, posts
- Shared by CLI seed, admin Seed button, and test helpers

**Rules:**

- Use `pnpm db:reset` for a full wipe + reseed (destructive to local content)
- Do **not** commit database files

---

## E2E / visual CI

`tests/prepare-e2e-db.ts`:

```bash
rm -f .e2e/payload.db
pnpm db:migrate   # DATABASE_URL=file:./.e2e/payload.db
pnpm db:seed      # E2E env vars
```

Playwright `webServer` (E2E + visual on CI):

```
pnpm exec tsx tests/prepare-e2e-db.ts && pnpm build && pnpm start
```

Local visual tests still use `pnpm dev` with `visualGlobalSetup` seeding (or `SKIP_VISUAL_SEED=1` when parent already seeded).

---

## Production deployment

```bash
payload migrate
pnpm build
pnpm start
```

Wire as `pnpm ci` or platform build command. **Do not** seed production unless staging intentionally.

| Variable | Local | E2E | Production |
|----------|-------|-----|------------|
| `DATABASE_URL` | `file:./payload.db` | `file:./.e2e/payload.db` | Postgres URL |
| `PAYLOAD_SECRET` | `.env` | CI secret | Platform secret |
| `SEED_ADMIN_*` | `.env` | Test values in prepare-e2e | Staging only |

---

## Pre-commit hook

Scoped to schema paths — see [payload-migration-workflow-prompt.md](../payload-migration-workflow-prompt.md).

Runs `pnpm payload migrate:create` when schema files are staged without a matching migration.

**Escape hatch:** `git commit --no-verify` (discouraged).

---

## Implementation status (this repo)

- [x] Baseline migration in `src/migrations/`
- [x] `push: false` + `prodMigrations` in `payload.config.ts`
- [x] `scripts/dev.ts`, `db-reset.ts`, `ensure-migration.ts`, `db-path.ts`
- [x] npm scripts: `db:migrate`, `db:seed`, `db:setup`, `db:reset`, `ci`
- [x] Husky pre-commit hook
- [x] `tests/prepare-e2e-db.ts` + Playwright webServer updates
- [x] `docs/database.md` cheat sheet

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| `migrate:create` fails | Ensure `.env` is valid and run `pnpm db:setup` first |
| SQLite lock during seed | Stop `pnpm dev`, then `pnpm db:reset` |
| Build hangs on migration prompt | E2E DB must use migrate + seed, not dev push |
| `no such table` on fresh migrate | Missing baseline migration — regenerate from current schema |
| Hook fails on commit | Run `pnpm db:setup`, ensure `.env` has `PAYLOAD_SECRET` and `DATABASE_URL` |
