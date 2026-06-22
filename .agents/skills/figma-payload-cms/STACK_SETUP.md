# Stack setup — new project checklist

Use this when bootstrapping **another repo** on the same stack: **Next.js + Payload 3 + Figma MCP + Playwright + Playwright CLI**.

Copy with the skill pack: [README.md](README.md).

---

## 1. Required agent skills (mandatory)

Agents must load **all four** before Figma → Payload work:

| Skill | Install location | Purpose |
|-------|------------------|---------|
| **Figma → Payload** | `.agents/skills/figma-payload-cms/` | This workflow — phases, subagents, visual QA |
| **Payload CMS** | `.agents/skills/payload/` | Collections, fields, hooks, access, API |
| **Playwright** | `.agents/skills/playwright/` | E2E/visual — see playwright-qa.md |
| **Playwright CLI** | `.agents/skills/playwright-cli/` | Live section QA (`pnpm test:visual:live`, attach, snapshot) |

### Copy into the target repo

```bash
# From payload-figma-boilerplate (recommended — all four skills are required)
pnpm skills:install /path/to/project
pnpm skills:install /path/to/project --deps --config
pnpm skills:verify /path/to/project
```

Manual copy:

```bash
cp -R .agents/skills/figma-payload-cms  /path/to/project/.agents/skills/
cp -R .agents/skills/payload            /path/to/project/.agents/skills/
cp -R .agents/skills/playwright           /path/to/project/.agents/skills/
cp -R .agents/skills/playwright-cli     /path/to/project/.agents/skills/
```

All four skills live under `.agents/skills/` — no user-level or external skill paths required. The installer writes `.agents/skills/manifest.json` listing required skills.

```bash
pnpm add -D @playwright/cli @playwright/test
pnpm exec playwright-cli install --skills   # merges CLI skill into node_modules; re-copy to .agents/skills/ if needed
```

### `AGENTS.md` snippet (paste into target repo)

```markdown
# Agents

**Payload CMS** — `.agents/skills/payload/SKILL.md`  
**Figma → Payload** — `.agents/skills/figma-payload-cms/SKILL.md`  
**Playwright** — `.agents/skills/playwright/SKILL.md`  
**Playwright CLI** — `.agents/skills/playwright-cli/SKILL.md`  
Workflow QA — `.agents/skills/figma-payload-cms/playwright-qa.md`  

Per-project config: `docs/FIGMA_PAYLOAD_PROJECT.md`
```

---

## 2. Required npm packages

```bash
pnpm add -D @playwright/test @playwright/cli tsx cross-env dotenv
```

Document scripts in `docs/FIGMA_PAYLOAD_PROJECT.md` — see [project-config.template.md](project-config.template.md).

---

## 3. Git policy — assets vs snapshots

| Path | Commit? | What |
|------|---------|------|
| `public/media/figma/` | **Yes** | Figma `download_assets` — ~11 seed source files |
| `public/media/*` (except `figma/`) | **No** | Payload responsive sizes (~7 per image, ~70+ files after seed) |
| `references/figma/**/*.md`, `.gitkeep` | **Yes** | MANIFEST, folder structure |
| `references/figma/**/*.png` | **No** | ~11 Figma gold-master crops (local Phase 0 cache) |
| `references/playwright/**/*.md` | **Yes** | Baseline docs |
| `references/playwright/**` (images) | **No** | ~39 Playwright baselines (13 × 3 viewports) |
| `playwright-report/`, `test-results/` | **No** | Test run artifacts |

Copy `references/playwright/.gitignore` and `references/figma/.gitignore` into new projects.

**Rule:** Never commit visual regression baselines or Figma comparison screenshots. Only commit **seed media assets** and **text manifests**.

If snapshots were committed by mistake:

```bash
git rm -r --cached references/playwright references/figma
git add references/playwright/.gitignore references/figma/.gitignore references/playwright/README.md references/figma/**/MANIFEST.md references/figma/**/.gitkeep
```

Regenerate local baselines: `pnpm test:visual --update-snapshots`  
Regenerate Figma cache: [scripts/figma-refs-setup.md](../../scripts/figma-refs-setup.md)  
Why so many files on disk? [docs/LOCAL_IMAGES.md](../../docs/LOCAL_IMAGES.md) (in reference repos)

---

## 4. Per-project config (once)

1. [project-config.template.md](project-config.template.md) → `docs/FIGMA_PAYLOAD_PROJECT.md`
2. [plan-template.md](plan-template.md) → `docs/{PAGE}_PAGE_PLAN.md`
3. `.env` — `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD`, `PAYLOAD_SECRET`, etc.
4. Phase 0 — Figma reference cache + seed assets ([figma-refs-setup.md](../../scripts/figma-refs-setup.md))

---

## 5. Verify

```bash
pnpm figma:refs:check          # local Figma PNG cache (optional until exported)
pnpm db:setup                  # or pnpm dev on first clone (auto-setup)
pnpm test:e2e
pnpm test:visual               # batch specs; baselines stay local
```

Database workflow: [docs/database.md](../../docs/database.md) · [docs/payload-migration-workflow-prompt.md](../../docs/payload-migration-workflow-prompt.md)
