# Figma → Payload CMS (shareable skill)

Portable agent skill for **Figma MCP → Payload CMS page builds** with phased subagents, spacing audit, QA, and Playwright visual regression.

**Process and flows are stable.** Component names, tokens, paths, and test IDs are **configured per project**.

## Install in another project

**Migrate checklist:** [../MIGRATE.md](../MIGRATE.md) (copy skills + scaffold + per-project docs)  
**Bootstrap details:** [STACK_SETUP.md](STACK_SETUP.md)

### Option A — Copy into the repo (team share via git)

```bash
# From payload-figma-boilerplate (installs all four required skills + AGENTS.md)
pnpm skills:install /path/to/other-project
pnpm skills:install /path/to/other-project --deps --config
pnpm skills:verify /path/to/other-project
```

Manual copy:

```bash
# From this skill's directory (or a reference repo like payload-figma-boilerplate)
cp -R .agents/skills/figma-payload-cms /path/to/other-project/.agents/skills/
cp -R .agents/skills/payload            /path/to/other-project/.agents/skills/
cp -R .agents/skills/playwright          /path/to/other-project/.agents/skills/
cp -R .agents/skills/playwright-cli     /path/to/other-project/.agents/skills/
```

Add to the other project's `AGENTS.md` (see [STACK_SETUP.md](STACK_SETUP.md) for full snippet):

```markdown
**Payload CMS** — `.agents/skills/payload/SKILL.md`
**Figma → Payload** — `.agents/skills/figma-payload-cms/SKILL.md`
**Playwright** — `.agents/skills/playwright/SKILL.md`
**Playwright CLI** — `.agents/skills/playwright-cli/SKILL.md`
Also create `docs/FIGMA_PAYLOAD_PROJECT.md` from `project-config.template.md`.
```

### Option B — Personal skill (all your projects)

```bash
cp -R .agents/skills/figma-payload-cms ~/.cursor/skills/figma-payload-cms
```

Each project still needs **`docs/FIGMA_PAYLOAD_PROJECT.md`** (or path set in AGENTS.md) with that repo's Figma fileKey, component map, and test IDs.

### Option C — Git submodule / monorepo package

Point submodule at this skill folder; symlink into `.agents/skills/figma-payload-cms`.

## Required per-project setup (once per repo)

See **[STACK_SETUP.md](STACK_SETUP.md)** for skills, packages, and git policy.

1. Copy skills: `figma-payload-cms`, `payload`, `playwright`, `playwright-cli` → `.agents/skills/`
2. Copy [project-config.template.md](project-config.template.md) → `docs/FIGMA_PAYLOAD_PROJECT.md`
3. Fill in: Figma fileKey, route, breakpoints, **your** shared component names, CSS token prefix, `data-testid` convention, seed helper path
4. Write page plan: `docs/{PAGE}_PAGE_PLAN.md` from [plan-template.md](plan-template.md)
5. Copy `references/playwright/.gitignore` and `references/figma/.gitignore` — **never commit snapshot PNGs**
6. Commit Figma seed assets to `public/media/figma/` only (not baselines)
7. If using Payload Website Template, also read [adapters/payload-website-template.md](adapters/payload-website-template.md)

## Skill contents

| File | Purpose |
|------|---------|
| [STACK_SETUP.md](STACK_SETUP.md) | **New project bootstrap** — required skills, packages, git policy |
| [SKILL.md](SKILL.md) | Main workflow (phases 0–8) — **start here** |
| [project-config.template.md](project-config.template.md) | Per-project config template |
| [spacing-patterns.md](spacing-patterns.md) | Figma vertical rhythm (design-agnostic) |
| [playwright-qa.md](playwright-qa.md) | Playwright E2E, visual regression, Playwright CLI, test subagents |
| [visual-qa.md](visual-qa.md) | Snapshot paths and baselines |
| [editor-experience.md](editor-experience.md) | Content author UX — labels, colors, links (Phase 0) |
| [subagent-strategy.md](subagent-strategy.md) | **Per-section build + QA subagents** (pixel-perfect workflow) |
| [section-anchors.md](section-anchors.md) | Hardcoded `#id` on blocks + nav seed (not CMS) |
| [payload-patterns.md](payload-patterns.md) | Payload block/hero/seed patterns |
| [figma-access.md](figma-access.md) | Figma MCP tools and URL rules |
| [plan-template.md](plan-template.md) | Page implementation plan skeleton |
| [adapters/payload-website-template.md](adapters/payload-website-template.md) | Optional Payload template paths |
| [examples/example-implementation.md](examples/example-implementation.md) | **Example only** — Home reference (this repo) |

## What stays the same across projects

- Phase gates, discovery, plan approval
- **One build subagent + one QA subagent per section** — never the same agent ([subagent-strategy.md](subagent-strategy.md))
- Editor experience rules (plain labels, semantic colors, internal links first)
- Section anchors hardcoded in components — [section-anchors.md](section-anchors.md)
- Spacing anti-patterns (no doubled `py-*` + inner `border-t pt-*`)
- Full-page + per-section visual regression (Playwright)
- Playwright CLI for interactive QA/debug (**required** — `.agents/skills/playwright-cli/`)
- Load **Playwright skill** (`.agents/skills/playwright/SKILL.md`) — in-repo; routes to playwright-qa.md
- Load **Payload skill** (`.agents/skills/payload/`) for schema, hooks, and API
- **Git:** commit seed assets (`public/media/figma/`); never commit snapshot PNGs under `references/`
- Figma MCP sequence (`get_design_context` for exact gaps)

## What changes per project

- Block slugs, component file names, design token prefix (`--brand-*` vs `--acme-*`)
- Shared UI components (`SectionContainer`, `PageButton`, etc.)
- `data-testid` prefix (`site-header` vs `site-header`)
- Seed script, DB adapter, Playwright base URL
- Number of sections / Figma node IDs (documented in page plan)

## Required skills (same stack — all projects)

| Skill | Path | Required |
|-------|------|----------|
| Payload CMS | `.agents/skills/payload/SKILL.md` | **Yes** |
| Figma → Payload | This skill pack | **Yes** |
| Playwright | `.agents/skills/playwright/SKILL.md` | **Yes** |
| Playwright CLI | `.agents/skills/playwright-cli/SKILL.md` | **Yes** |

Bootstrap checklist for new repos: [STACK_SETUP.md](STACK_SETUP.md). Do not treat Payload or Playwright CLI as optional on this stack.
