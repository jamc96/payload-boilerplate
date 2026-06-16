---
name: figma-payload-cms
description: >-
  Design-to-CMS workflow integrating Figma MCP, Cursor subagents, and Payload CMS
  (Next.js Website Template). Use when implementing a Figma page in Payload, mapping
  Figma sections to blocks/globals, planning phased builds, fixing Figma MCP access,
  or seeding home pages from figma.com/design URLs.
---

# Figma + Cursor + Payload CMS

End-to-end workflow: **Figma design → plan doc → phased subagent build → Payload blocks/globals → seed → E2E**.

Also load `.agents/skills/payload/SKILL.md` for Payload API and schema patterns.

## Prerequisites

| Tool | Purpose |
|------|---------|
| Figma MCP (`plugin-figma-figma`) | `get_metadata`, `get_design_context`, `get_variable_defs`, `get_screenshot`, `download_assets`, `create_new_file` |
| Payload Website Template | Next.js + `pages` collection, hero group, layout blocks, header/footer globals |
| Cursor subagents | Parallel phases; keep parent context clean |

## Phase 0 — Gate (always first)

**Do not code until:**

1. Figma MCP can read the file (`get_metadata` succeeds)
2. User approved a written plan (`docs/<PROJECT>_PAGE_PLAN.md`)
3. Scope questions answered (brand, CMS vs hardcoded, seed strategy)

### Figma URL rules

| URL | MCP |
|-----|-----|
| `figma.com/design/:fileKey/...?node-id=X-Y` | ✅ Use fileKey + node `X:Y` |
| `figma.com/site/...` | ❌ Not supported — get `/design/` URL or duplicate into editable file |
| Community file, access denied | Use `create_new_file` (org planKey from `whoami`), user pastes frames, use new fileKey |

### Figma MCP sequence (per page/frame)

```
1. whoami                    → confirm account
2. get_metadata(nodeId)      → section tree + node IDs
3. get_variable_defs(node)   → colors, typography tokens
4. get_design_context(node)  → layout reference (adapt to project stack; do NOT add Tailwind as new dep)
5. get_screenshot(node)      → visual QA reference
6. download_assets(node)     → media for seed/public (optional)
```

Launch a **readonly subagent** for full section inventory if the page is large.

## Phase 1 — Discovery (parallel subagents)

Run two explorations in parallel:

**Subagent A — Figma:** Section list top→bottom, copy, tokens, responsive frames (Desktop/Tablet/Mobile), reusable patterns (eyebrow, CTAs, numbered lists).

**Subagent B — Payload:** Read `src/collections/Pages`, `src/blocks/RenderBlocks.tsx`, `src/heros/`, `Header/` + `Footer/` globals, `src/endpoints/seed/home.ts`, `globals.css`. Report extend vs net-new.

### Map Figma → Payload

| Figma section | Payload entity |
|---------------|----------------|
| Nav | `header` global |
| Hero | `hero` group variant (not a block) |
| Content sections | `layout` blocks |
| Footer | `footer` global |

Each section → one block slug unless a close match exists (`content`, `cta`, `mediaBlock`).

## Phase 2 — Plan document

Write `docs/<NAME>_PAGE_PLAN.md` including:

1. Goals / non-goals
2. Figma fileKey + node reference table
3. Design tokens (from `get_variable_defs`)
4. Section → block mapping with **field schemas**
5. Shared field factories (`sectionHeader`, `iconPicker`, `ctaButton`, `anchorId`)
6. Build phases + subagent assignments
7. Seed layout order + acceptance criteria
8. **Approval gate** — wait for user "go ahead"

Use [plan-template.md](plan-template.md) as starting structure. See [docs/GLANCE_HOME_PAGE_PLAN.md](../../../docs/GLANCE_HOME_PAGE_PLAN.md) for a completed example in this repo.

## Phase 3 — Build (subagents + commits)

**One commit per phase.** User should approve plan before Phase 0 code.

| Phase | Scope | Subagents |
|-------|--------|-----------|
| 0 | Tokens, fonts, field factories, shared UI, CMSLink fixes | 1 |
| 1A | Header/footer globals + components | 1 |
| 1B | Hero variant | 1 |
| 2 | New blocks (`config.ts` + `Component.tsx` each) | N parallel |
| 3 | Register in `Pages` + `RenderBlocks`, `generate:types` | 1 |
| 4 | Seed + assets | 1 |
| 5 | E2E tests | 1 |

### Block pattern (Payload Website Template)

```
src/blocks/MyBlock/
  config.ts      → Block slug, interfaceName, fields
  Component.tsx  → import type from @/payload-types, data-testid="block-{slug}"
```

Register in `src/collections/Pages/index.ts` and `src/blocks/RenderBlocks.tsx`. Run `pnpm generate:types`.

Reuse: `Media`, `RichText`, `CMSLink`, `link`/`linkGroup`, `container`, `cn()`.

### Subagent prompt template

```
Project: {path}
Plan: docs/{PLAN}.md — Phase {N}, section {X}
Read: .agents/skills/payload/SKILL.md + existing block example (Content/)
Figma: fileKey {key}, node {id}
Deliver: listed files only. Do NOT register blocks unless Phase 3.
Do NOT commit unless asked.
```

## Phase 4 — Seed (common failures)

Admin seed: `POST /next/seed` (requires logged-in user).

CLI seed: `pnpm seed` (`scripts/seed-cli.mts` with `dotenv/config`).

**When extending header/footer globals**, reset ALL new fields in seed clear step:

```ts
await payload.updateGlobal({
  slug: 'header',
  req,
  context: { disableRevalidate: true },
  data: {
    navItems: [],
    logo: null,
    ctaLink: { type: 'custom', label: '...', url: '...', appearance: 'primary' },
  },
})
```

**Post updates during seed** must pass `req` + `context: { disableRevalidate: true }` or Next.js revalidation throws outside app context.

**Why old design still shows:** DB has previous `home` page. Run `pnpm seed` after schema changes.

## Phase 5 — QA

- Hard refresh / restart `pnpm dev` after seed
- E2E: hero text, `data-testid` per block, header CTA href, anchor ids
- Live preview in Payload admin

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| "No edit access" on Figma | Share email as Editor; use `/design/` not `/site/`; or `create_new_file` + paste |
| Seed fails on globals | Clear step missing new global fields |
| Seed fails on revalidate | Add `req` + `disableRevalidate` on updates |
| `footer_logo_idx already exists` | Don't run two Payload inits concurrently (E2E + dev); restart dev or reset DB |
| Empty layout, old hero | Seed didn't complete — run `pnpm seed` |

## Additional resources

- [plan-template.md](plan-template.md) — plan doc skeleton
- [payload-patterns.md](payload-patterns.md) — field factories, hero, RenderBlocks
- [figma-access.md](figma-access.md) — URL parsing, MCP tools, access workflow
