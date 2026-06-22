# Database workflow

Quick reference. **Full detail lives in the plan:**

→ **[database-collaboration-and-deployment-plan.md](./plans/database-collaboration-and-deployment-plan.md)** — rollout & team contract

→ **[payload-migration-workflow-prompt.md](./payload-migration-workflow-prompt.md)** — full data flow + copy-paste prompt for other Payload/Next projects

## Cheat sheet

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Migrate (or setup if no DB), then Next.js |
| `pnpm db:setup` | Migrate + seed — first clone |
| `pnpm db:reset` | Wipe local DB, migrate + seed |
| `pnpm db:migrate` | Apply pending migrations |
| `pnpm db:seed` | Baseline demo content + admin |
| `pnpm db:ensure-migration` | Manual pre-commit check (same as git hook) |
| `pnpm ci` | Migrate + build — CI/deploy |

## Two moments

| When | What |
|------|------|
| `pnpm dev` | **Apply** migrations from git |
| `git commit` | **Create** migration if schema files changed (pre-commit hook) |

## Rules (short)

1. Schema → `src/migrations/` (never dev push)
2. Data → `scripts/seed-cli.mts` + `src/endpoints/seed/` (never commit `*.db` or `.e2e/`)
3. Review migration SQL in every PR
4. Production: migrate before build; no seed unless staging

See the [plan](./plans/database-collaboration-and-deployment-plan.md) for hook behavior, E2E, production deploy, testing strategy, and troubleshooting.
