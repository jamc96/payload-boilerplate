# Figma + Payload — Project Config

> Copy this file to **`docs/FIGMA_PAYLOAD_PROJECT.md`** in each repo and fill in all `{placeholders}`.
> Agents must read this **before** implementing. Process lives in `.agents/skills/figma-payload-cms/SKILL.md`.

## Project

| Field | Value |
|-------|-------|
| Project name | `{Project Name}` |
| Repo root | `{/absolute/or/relative/path}` |
| Page plan doc | `docs/{PAGE}_PAGE_PLAN.md` |
| Playwright skill | `.agents/skills/playwright/SKILL.md` |
| Playwright QA workflow | `.agents/skills/figma-payload-cms/playwright-qa.md` |
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
| Section title group | `{src/components/SectionHeader/}` | section label, heading, description |
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

## Editor labels (content author UI)

Map code slugs to admin labels — see [editor-experience.md](../.agents/skills/figma-payload-cms/editor-experience.md).

| Code slug | Editor label | Notes |
|-----------|--------------|-------|
| `{blockSlug}` | `{Editor-facing name}` | `{When to use}` |

Rules: no hex color fields; internal links default; plain field labels.

## Section anchors (in-page nav)

Path: `{src/constants/sectionAnchors.ts}` — see [section-anchors.md](section-anchors.md)

| Block slug | HTML `id` | Used in nav? |
|------------|-----------|--------------|
| `{blockSlug}` | `{html-id}` | `{yes/no}` |

Hardcode `id` on block components; seed nav uses `sectionAnchorHref()`. No CMS "Section ID" field.

## Required agent skills (mandatory — same stack)

| Skill | Path |
|-------|------|
| Payload CMS | `.agents/skills/payload/SKILL.md` |
| Figma → Payload | `.agents/skills/figma-payload-cms/SKILL.md` |
| Playwright | `.agents/skills/playwright/SKILL.md` |
| Playwright CLI | `.agents/skills/playwright-cli/SKILL.md` |

Bootstrap new repos: `.agents/skills/figma-payload-cms/STACK_SETUP.md`

## Git policy (assets vs snapshots)

| Commit | Do not commit |
|--------|----------------|
| `public/media/figma/` — Figma seed assets | `public/media/file/` — Payload uploads |
| `references/figma/**/MANIFEST.md`, `.gitkeep` | `references/figma/**/*.png` — gold masters |
| `references/playwright/**/*.md` | `references/playwright/**` images — baselines |
| | `playwright-report/`, `test-results/` |

Copy `references/playwright/.gitignore` and `references/figma/.gitignore` into every new project.

## Visual QA hooks

| Field | Value |
|-------|-------|
| Header testid | `{site-header}` |
| Hero testid | `{site-hero}` |
| Block testid pattern | `{block-{slug}}` |
| Footer testid | `{site-footer}` |
| Section test IDs export | `{tests/helpers/pageSectionTestIds.ts}` |
| Seed helper for tests | `{tests/helpers/seedPageContent.ts}` |
| Global visual seed | `{tests/global/visualGlobalSetup.ts}` |
| Visual specs | `{tests/visual/full-page.visual.spec.ts}` + `{tests/visual/sections/*.visual.spec.ts}` |
| Section snapshot helper | `{tests/helpers/visualSectionSnapshot.ts}` |
| Playwright visual config | `{playwright.visual.config.ts}` |
| Figma refs folder | `{references/figma/{page}/}` (MANIFEST committed; PNGs local/gitignored) |
| Playwright baselines | `{references/playwright/{project}/demo-home/}` (PNGs local/gitignored) |

## Commands

| Command | Purpose |
|---------|---------|
| `{pnpm dev}` | Local dev server |
| `{pnpm seed}` | Seed CMS (creates admin from `SEED_ADMIN_*` env) |
| `{pnpm figma:refs:check}` | Verify local Figma gold-master PNG cache |
| `{pnpm test:e2e}` | Functional E2E (Phase 5) |
| `{pnpm test:visual}` | Visual regression — batch specs (fast; excludes `@isolated`) |
| `{pnpm test:visual:live}` | Playwright CLI attach for live agent QA |
| `{pnpm test:visual:section}` | One isolated section spec (slow) |
| `SKIP_VISUAL_SEED=1 {pnpm test:visual}` | Skip global seed when parent already seeded |
| `{pnpm cli}` | Playwright CLI (optional — see playwright-qa.md) |

## Optional adapter

- [ ] Payload Website Template → see `adapters/payload-website-template.md`

## Example page plan

Link when created: `docs/{PAGE}_PAGE_PLAN.md`
