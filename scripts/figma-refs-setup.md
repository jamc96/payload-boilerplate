# Phase 0 — Figma reference cache (one-time setup)

Agents compare code to **local PNGs** under `references/figma/`. Do **not** call Figma MCP `get_screenshot` on every QA run — export once, refresh only when the design changes.

## When to run

| Trigger | Action |
|---------|--------|
| New machine / clone | Export missing breakpoints |
| Figma design updated | Re-export affected sections only |
| `pnpm figma:refs:check` fails | Export listed missing files |

## Verify cache

```bash
pnpm figma:refs:check
```

Committed: `references/figma/demo-home/MANIFEST.md` (node IDs, filenames).  
Gitignored: all `references/figma/**/*.png` and `references/playwright/**` images — **never commit snapshots**.  
Committed seed assets: `public/media/figma/` (Figma `download_assets` for CMS seed).

## Export workflow (single Phase 0 agent)

1. Confirm Figma MCP access (`whoami`, `get_metadata` on fileKey `lEM5McyRvPeMRIn4Ce6q0a`).
2. For each row in `references/figma/demo-home/MANIFEST.md`, call **`get_screenshot`** with `fileKey` + section `nodeId`.
3. Save PNGs to the matching breakpoint folder:
   - Desktop: `references/figma/demo-home/desktop-1280/{filename}.png`
   - Tablet: `references/figma/demo-home/tablet-800/` (section crops; skip full-page scroll unless needed)
   - Mobile: `references/figma/demo-home/mobile-375/`
4. Run **`download_assets`** once for seed images → `public/media/figma/` (see `src/endpoints/seed/figma-media.ts`).
5. Run `pnpm figma:refs:check` until it passes.
6. Annotate export date in `MANIFEST.md` § Status.

## Agent rules after Phase 0

| Do | Don't |
|----|-------|
| Open local PNG + live page side-by-side | Re-export Figma on every subagent |
| Use Figma MCP `get_design_context` for spacing tokens | Use MCP screenshots as default QA input |
| Re-export only when design or MANIFEST node IDs change | Commit PNGs to git |

## Playwright baselines (separate cache)

Self-baselines for CI regression — not Figma gold masters:

```bash
pnpm seed:fresh
pnpm test:visual --update-snapshots
```

See `references/playwright/README.md`.
