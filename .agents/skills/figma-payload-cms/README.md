# Figma → Payload CMS (shareable skill)

Portable agent skill for **Figma MCP → Payload CMS page builds** with phased subagents, spacing audit, QA, and Playwright visual regression.

**Process and flows are stable.** Component names, tokens, paths, and test IDs are **configured per project**.

## Install in another project

### Option A — Copy into the repo (team share via git)

```bash
# From this skill's directory
cp -R .agents/skills/figma-payload-cms /path/to/other-project/.agents/skills/
```

Add to the other project's `AGENTS.md`:

```markdown
**Figma → Payload** — `.agents/skills/figma-payload-cms/SKILL.md`
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

1. Copy [project-config.template.md](project-config.template.md) → `docs/FIGMA_PAYLOAD_PROJECT.md`
2. Fill in: Figma fileKey, route, breakpoints, **your** shared component names, CSS token prefix, `data-testid` convention, seed helper path
3. Write page plan: `docs/{PAGE}_PAGE_PLAN.md` from [plan-template.md](plan-template.md)
4. If using Payload Website Template, also read [adapters/payload-website-template.md](adapters/payload-website-template.md)

## Skill contents

| File | Purpose |
|------|---------|
| [SKILL.md](SKILL.md) | Main workflow (phases 0–8) — **start here** |
| [project-config.template.md](project-config.template.md) | Per-project config template |
| [spacing-patterns.md](spacing-patterns.md) | Figma vertical rhythm (design-agnostic) |
| [visual-qa.md](visual-qa.md) | Playwright full-page + section snapshots |
| [payload-patterns.md](payload-patterns.md) | Payload block/hero/seed patterns |
| [figma-access.md](figma-access.md) | Figma MCP tools and URL rules |
| [plan-template.md](plan-template.md) | Page implementation plan skeleton |
| [adapters/payload-website-template.md](adapters/payload-website-template.md) | Optional Payload template paths |
| [examples/payload-poc-glance.md](examples/payload-poc-glance.md) | Reference implementation (this repo) |

## What stays the same across projects

- Phase gates, discovery, plan approval, build/QA subagent split
- Spacing anti-patterns (no doubled `py-*` + inner `border-t pt-*`)
- Full-page + per-section visual regression
- Figma MCP sequence (`get_design_context` for exact gaps)

## What changes per project

- Block slugs, component file names, design token prefix (`--brand-*` vs `--acme-*`)
- Shared UI components (`SectionContainer`, `PageButton`, etc.)
- `data-testid` prefix (`site-header` vs `glance-header`)
- Seed script, DB adapter, Playwright base URL
- Number of sections / Figma node IDs (documented in page plan)

## Payload CMS skill dependency

Load the project's Payload skill if present (e.g. `.agents/skills/payload/SKILL.md`) for schema, hooks, and API details. This skill does not replace it.
