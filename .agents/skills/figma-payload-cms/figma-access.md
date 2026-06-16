# Figma MCP access

## URL parsing

```
figma.com/design/:fileKey/:name?node-id=1-2  →  fileKey, nodeId 1:2
figma.com/design/:fileKey/branch/:branchKey/ →  use branchKey as fileKey
figma.com/site/:fileKey/                     →  NOT supported — get /design/ URL
```

## Tools (read `mcps/plugin-figma-figma/tools/*.json` before calling)

| Tool | Use |
|------|-----|
| `whoami` | Account email, plan keys |
| `get_metadata` | Section tree (node IDs) |
| `get_design_context` | Reference layout + screenshot; **extract `gap-*`, `pt-*`, `pb-*` for spacing** |
| `get_variable_defs` | Design tokens |
| `get_screenshot` | Visual QA — **Phase 0 export only**; agents read local `references/figma/` after setup |
| `download_assets` | Images for seed — **Phase 0 once** → `public/media/figma/` |
| `create_new_file` | Blank design file when access blocked |

## Access workflow when blocked

1. Confirm `whoami` email matches Figma file owner/shared user
2. Share file with that email as **Editor** (view-only org access may fail)
3. Copy **`figma.com/design/`** URL from editor address bar
4. Fallback: `create_new_file` with planKey from `whoami` → user pastes frames → use new fileKey

## MCP cannot list projects

Only per-file access via fileKey. No "browse my Figma files" tool.

## Design-to-code note

`get_design_context` returns React+Tailwind **reference only**. Adapt to the target project's stack and component names from `docs/FIGMA_PAYLOAD_PROJECT.md`.

**Spacing:** Parse MCP output (`gap-[Npx]`, `pt-[Npx]`, `pb-[Npx]`) → [spacing-patterns.md](spacing-patterns.md). Values vary by design; process is the same across projects.
