# Figma + Payload — Project Config

> **Boilerplate defaults** for `payload-figma-boilerplate`.  
> When starting a **new Figma page**, copy [plan-template.md](../.agents/skills/figma-payload-cms/plan-template.md) → `docs/{PAGE}_PAGE_PLAN.md` and update Figma fields below.  
> Process: `.agents/skills/figma-payload-cms/SKILL.md`

## Project

| Field | Value |
|-------|-------|
| Project name | Payload Figma Boilerplate |
| Repo root | `.` |
| Page plan doc | `docs/HOME_PAGE_PLAN.md` (create per page) |
| Target route | `/` → CMS slug `home` |
| Stack | Next.js 16 + Payload 3.85 + SQLite + Tailwind v4 |

## Figma

| Field | Value |
|-------|-------|
| Design URL | `{your figma.com/design/...}` |
| `fileKey` | `{fileKey}` |
| Desktop frame | `{node}` @ 1280px |
| Tablet frame | `{node}` @ 800px |
| Mobile frame | `{node}` @ 375px |

Replace placeholders when you connect your design. The included demo home works without Figma until then.

## Payload mapping

| Figma region | Payload entity | Path |
|--------------|----------------|------|
| Navigation | header global | `src/Header/` |
| Hero | `marketingHero` variant | `src/heros/MarketingHero/` |
| Sections | layout blocks | `src/blocks/` |
| Footer | footer global | `src/Footer/` |

## Shared frontend components

| Role | Path |
|------|------|
| Horizontal inset | `src/components/SiteSection/` |
| Section title | `src/components/SectionHeader/` |
| CTA button | `src/components/SiteButton/` |
| Icons | `src/components/Icon/` |

## Design tokens (prefix: `site`)

| Token | Variable |
|-------|----------|
| Primary | `--site-primary` |
| Section top | `--site-section-pt` (80px) |
| Section bottom | `--site-section-pb` (120px) |
| Stack gap | `--site-gap-stack` (50px) |
| Column gap | `--site-column-gap` (20px) |
| Divider | `--site-divider` |

File: `src/app/(frontend)/globals.css` · Tailwind: `bg-site-*`, `text-site-*`, `border-site-*`

## Visual QA hooks

| Field | Value |
|-------|-------|
| Header testid | `site-header` |
| Hero testid | `site-hero` |
| Block testid | `block-{slug}` |
| Footer testid | `site-footer` |
| Section IDs export | `tests/helpers/seedDemoPage.ts` → `PAGE_SECTION_TEST_IDS` |
| Seed helper | `tests/helpers/seedDemoPage.ts` |
| Playwright baselines | `references/playwright/{project}/demo-home/` (local only) |
| Figma refs | `references/figma/example-home/` (local PNGs; `MANIFEST.md` is a sample) |

## Seed admin (`.env`)

| Variable | Default |
|----------|---------|
| `SEED_ADMIN_EMAIL` | `admin@example.com` |
| `SEED_ADMIN_PASSWORD` | `password` |
| `SEED_ADMIN_NAME` | `Admin` |

## Commands

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Dev server (migrate on start) |
| `pnpm db:setup` | Migrate + seed |
| `pnpm db:reset` | Wipe DB + migrate + seed |
| `pnpm seed` / `pnpm seed:fresh` | Alias for `db:seed` / `db:reset` |
| `pnpm figma:refs:check` | Verify local Figma PNG cache |
| `pnpm test:e2e` | E2E |
| `pnpm test:visual` | Visual regression (batch specs) |
| `pnpm test:visual:live` | Playwright CLI live QA |

Migrate / bootstrap: [.agents/MIGRATE.md](../.agents/MIGRATE.md) · [.agents/skills/figma-payload-cms/STACK_SETUP.md](../.agents/skills/figma-payload-cms/STACK_SETUP.md)

## Example only

Full walkthrough with real Figma node IDs: [.agents/skills/figma-payload-cms/examples/EXAMPLE_PAGE_PLAN.md](../.agents/skills/figma-payload-cms/examples/EXAMPLE_PAGE_PLAN.md)

Adapter: [payload-website-template.md](../.agents/skills/figma-payload-cms/adapters/payload-website-template.md)
