# Figma + Payload — Project Config

> Copy this file to **`docs/FIGMA_PAYLOAD_PROJECT.md`** in each repo and fill in all `{placeholders}`.
> Agents must read this **before** implementing. Process lives in `.agents/skills/figma-payload-cms/SKILL.md`.

## Project

| Field | Value |
|-------|-------|
| Project name | `{Project Name}` |
| Repo root | `{/absolute/or/relative/path}` |
| Page plan doc | `docs/{PAGE}_PAGE_PLAN.md` |
| Target route | `{/}` → CMS slug `{home}` |
| Stack | `{Next.js + Payload 3.x + Tailwind + …}` |

## Figma

| Field | Value |
|-------|-------|
| Design URL | `{https://www.figma.com/design/...}` |
| `fileKey` | `{fileKey}` |
| Desktop frame node | `{e.g. 1:118}` @ `{1280}` px |
| Tablet frame node | `{e.g. 1:274}` @ `{800}` px |
| Mobile frame node | `{e.g. 1:430}` @ `{375}` px |

## Payload mapping (adjust to your schema)

| Figma region | Payload entity | Config path |
|--------------|----------------|-------------|
| Navigation | `{header global}` | `{src/Header/}` |
| Hero | `{hero group variant}` | `{src/heros/}` |
| Content sections | `{layout blocks[]}` | `{src/blocks/}` |
| Footer | `{footer global}` | `{src/Footer/}` |

## Shared frontend components (your names — not fixed)

Document what you create in Phase 0 / 6A:

| Role | Component path | Notes |
|------|----------------|-------|
| Horizontal page inset | `{src/components/SectionContainer/}` | max-width + px only, no vertical padding |
| Section title group | `{src/components/SectionHeader/}` | eyebrow, heading, description |
| Primary CTA button | `{src/components/PageButton/}` | variants from design |
| Icon mapper | `{src/components/Icon/}` | optional |

## Design tokens (CSS prefix — your choice)

| Token | CSS variable example | Typical value |
|-------|----------------------|---------------|
| Section top (after border-t) | `--{prefix}-section-pt` | `5rem` (80px) |
| Section bottom | `--{prefix}-section-pb` | `7.5rem` (120px) |
| Stack gap (header internal) | `--{prefix}-gap-stack` | `3.125rem` (50px) |
| Column gap | `--{prefix}-column-gap` | `1.25rem` (20px) |
| Divider color | `--{prefix}-divider` | from Figma |
| Content max width | `--{prefix}-content-max` | e.g. `75rem` (1200px) |

Define in: `{src/app/(frontend)/globals.css}`

## Visual QA hooks

| Field | Value |
|-------|-------|
| Header testid | `{site-header}` |
| Hero testid | `{site-hero}` |
| Block testid pattern | `{block-{slug}}` |
| Footer testid | `{site-footer}` |
| Section test IDs export | `{tests/helpers/pageSectionTestIds.ts}` |
| Seed helper for tests | `{tests/helpers/seedPageContent.ts}` |
| Visual spec | `{tests/visual/{page}.visual.spec.ts}` |
| Playwright visual config | `{playwright.visual.config.ts}` |
| Figma refs folder | `{references/figma/{page}/}` |
| Playwright baselines | `{references/playwright/}` |

## Commands

| Command | Purpose |
|---------|---------|
| `{pnpm dev}` | Local dev server |
| `{pnpm seed}` | Seed CMS content |
| `{pnpm test:e2e}` | Functional E2E |
| `{pnpm test:visual}` | Visual regression |

## Optional adapter

- [ ] Payload Website Template → see `adapters/payload-website-template.md`

## Example page plan

Link when created: `docs/{PAGE}_PAGE_PLAN.md`
