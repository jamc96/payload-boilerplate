# Figma + Payload — Project Config

> **This repo:** Glance home page on Payload Website Template.  
> Process: `.agents/skills/figma-payload-cms/SKILL.md` | Example: `.agents/skills/figma-payload-cms/examples/payload-poc-glance.md`

## Project

| Field | Value |
|-------|-------|
| Project name | Glance (payload-poc) |
| Repo root | `/Users/jose.mejia/projects/payload-poc` |
| Page plan doc | `docs/GLANCE_HOME_PAGE_PLAN.md` |
| Target route | `/` → CMS slug `home` |
| Stack | Next.js 16 + Payload 3.85 + SQLite + Tailwind v4 |

## Figma

| Field | Value |
|-------|-------|
| Design URL | https://www.figma.com/design/lEM5McyRvPeMRIn4Ce6q0a |
| `fileKey` | `lEM5McyRvPeMRIn4Ce6q0a` |
| Desktop frame | `1:118` @ 1280px |
| Tablet frame | `1:274` @ 800px |
| Mobile frame | `1:430` @ 375px |

## Payload mapping

| Figma region | Payload entity | Path |
|--------------|----------------|------|
| Navigation | header global | `src/Header/` |
| Hero | `glanceHero` variant | `src/heros/GlanceHero/` |
| Sections | layout blocks | `src/blocks/` |
| Footer | footer global | `src/Footer/` |

## Shared frontend components

| Role | Path |
|------|------|
| Horizontal inset | `src/components/GlanceSection/` |
| Section title | `src/components/SectionHeader/` |
| CTA button | `src/components/GlanceButton/` |
| Icons | `src/components/Icon/` |

## Design tokens (prefix: `glance`)

| Token | Variable |
|-------|----------|
| Section top | `--glance-section-pt` (80px) |
| Section bottom | `--glance-section-pb` (120px) |
| Stack gap | `--glance-gap-stack` (50px) |
| Column gap | `--glance-column-gap` (20px) |
| Divider | `--glance-divider` |

File: `src/app/(frontend)/globals.css`

## Visual QA

| Field | Value |
|-------|-------|
| Header testid | `glance-header` |
| Hero testid | `glance-hero` |
| Block testid | `block-{slug}` |
| Footer testid | `glance-footer` |
| Section IDs | `tests/helpers/seedGlanceHome.ts` → `GLANCE_SECTION_TEST_IDS` |
| Page ready helper | `tests/helpers/visualPageReady.ts` |
| Visual spec | `tests/visual/glance-home.visual.spec.ts` |
| Playwright config | `playwright.visual.config.ts` |
| Figma refs | `references/figma/glance-home/` |
| Baselines | `references/playwright/` |

## Commands

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Dev server |
| `pnpm seed` | Seed CMS |
| `pnpm test:e2e` | E2E |
| `pnpm test:visual` | Visual regression |

## Adapter

Payload Website Template — `.agents/skills/figma-payload-cms/adapters/payload-website-template.md`
