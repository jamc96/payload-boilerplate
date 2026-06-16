# Local image files — why so many?

This repo can have **~150 image files on disk**. That looks wrong, but most are **generated locally** and **must not go to git**. Only **~11–15 source files** should ever be committed.

## Breakdown (typical after seed + visual tests)

| Location | Count | What | Commit? |
|----------|------:|------|---------|
| `public/media/figma/` | 11 | Figma seed sources (hero, logos, section photos) | **Yes** |
| `public/media/` (root) | ~67 | Payload responsive sizes (`-300x`, `-900x`, `-1200x630`, …) | **No** — recreated on every `pnpm seed` |
| `references/playwright/` | 39 | Visual regression baselines (13 snapshots × 3 viewports) | **No** — local machine only |
| `references/figma/` | 11 | Figma gold-master crops for design comparison | **No** — Phase 0 export, local only |
| `test-results/`, `playwright-report/` | ~6 | Failed test diffs / HTML report assets | **No** — delete anytime |
| `src/endpoints/seed/` | 4 | Template post images (website template) | Yes (small template assets) |

## Why Payload multiplies files

`src/collections/Media.ts` defines **7 image sizes** per upload (thumbnail, square, small, medium, large, xlarge, og).  
Seeding ~11 images → **~11 × 7 ≈ 77 files** under `public/media/`.

That is normal Payload behavior, not duplicate seed bugs.

## Why visual QA adds ~50 PNGs

Playwright stores **screenshots of the rendered page** (not source JPGs):

- 11 sections + 2 full-page = **13** per viewport  
- × **3** viewports (desktop / tablet / mobile) = **39** under `references/playwright/`

Figma gold masters under `references/figma/` are **design reference crops** (~11 on desktop) — optional local cache, not CMS assets.

## What was actually wrong

1. **`.gitignore` used `public/media/file/`** but Payload writes to `public/media/` directly → dozens of upload files showed up as untracked in git. Fixed: ignore `public/media/*` except `public/media/figma/`.
2. **Old Playwright baselines were committed** under `references/playwright/.../demo-home.visual.spec.ts/` (wrong path, 39 PNGs in git). Removed from index; kept local only.
3. **Three layers look like duplicates** but serve different roles: seed sources → CMS derivatives → QA screenshots.

## What to commit (only assets)

```text
public/media/figma/*          ← seed sources
references/figma/**/MANIFEST.md
references/playwright/README.md
src/endpoints/seed/*.webp     ← template placeholders
```

Everything else is regenerable.

## Clean up locally (optional)

```bash
# Remove Payload-generated sizes (keep figma sources); re-run pnpm seed to recreate
find public/media -maxdepth 1 -type f -delete

# Remove visual QA baselines (regenerate with pnpm test:visual --update-snapshots)
find references/playwright -name '*.png' -delete
find references/figma -name '*.png' -delete

# Remove test run junk
rm -rf test-results playwright-report
```

After cleanup you should have **~11 files** in `public/media/figma/` plus small template assets — until you seed and run visual tests again.
