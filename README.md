# Payload Figma Boilerplate

Public starter for **Payload CMS 3 + Next.js** with a repeatable **Figma → CMS → QA** agent workflow.

Built on the [Payload Website Template](https://github.com/payloadcms/payload/tree/main/templates/website), extended with:

- Marketing layout blocks (benefits, comparison table, hero variant, etc.)
- **Agent skills** under `.agents/skills/` (Figma workflow, Payload, Playwright, Playwright CLI)
- Seed admin via env vars, visual regression scaffolding, Figma reference cache
- Generic naming (`SiteSection`, `SiteButton`, `marketingHero`, `--site-*` tokens)

The demo home page is **sample content** — replace Figma fileKey, copy, and seed data for your project.

---

## Quick start

```bash
git clone https://github.com/YOUR_ORG/payload-figma-boilerplate.git
cd payload-figma-boilerplate
cp .env.example .env
pnpm install
pnpm seed:fresh
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) · Admin: `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` (defaults in `.env.example`).

---

## Agent workflow

Read **`AGENTS.md`** first. Required skills (in `.agents/skills/`):

| Skill | Purpose |
|-------|---------|
| `figma-payload-cms` | Phases 0–8, subagents, visual QA |
| `payload` | Collections, fields, hooks, API |
| `playwright` | E2E/visual tests (routes to playwright-qa.md) |
| `playwright-cli` | Live section QA |

Per-project config: **`docs/FIGMA_PAYLOAD_PROJECT.md`**

**Install skills into another Payload project (Plan A):**

```bash
pnpm skills:install /path/to/your-payload-site
pnpm skills:install /path/to/your-payload-site --deps --config
pnpm skills:verify /path/to/your-payload-site
```

| Doc | Purpose |
|-----|---------|
| [.agents/MIGRATE.md](.agents/MIGRATE.md) | Copy this repo to a new project (`pnpm skills:install`) |
| [.agents/skills/figma-payload-cms/STACK_SETUP.md](.agents/skills/figma-payload-cms/STACK_SETUP.md) | Skills, packages, git policy |
| [docs/LOCAL_IMAGES.md](docs/LOCAL_IMAGES.md) | Why many local images exist; what to commit |

**Example page plan** (reference only): [.agents/skills/figma-payload-cms/examples/EXAMPLE_PAGE_PLAN.md](.agents/skills/figma-payload-cms/examples/EXAMPLE_PAGE_PLAN.md)

---

## New Figma page

1. Fill Figma fields in `docs/FIGMA_PAYLOAD_PROJECT.md`
2. Create `docs/{PAGE}_PAGE_PLAN.md` from [plan-template.md](.agents/skills/figma-payload-cms/plan-template.md)
3. Phase 0: export assets → `public/media/figma/` · optional gold masters → `references/figma/`
4. Run build/QA subagents per [SKILL.md](.agents/skills/figma-payload-cms/SKILL.md)

---

## Scripts

| Command | Purpose |
|---------|---------|
| `pnpm seed` | Seed demo content |
| `pnpm seed:fresh` | Reset DB + seed |
| `pnpm test:e2e` | Functional tests |
| `pnpm test:visual` | Visual regression (local baselines) |
| `pnpm test:visual:live` | Playwright CLI attach for live QA |
| `pnpm figma:refs:check` | Verify Figma reference PNG cache |

---

## Git policy

| **Commit** | **Do not commit** |
|------------|-------------------|
| `public/media/figma/` seed assets | Payload upload derivatives in `public/media/*` |
| `.agents/`, docs, source | `references/**/*.png` (QA baselines) |
| | `playwright-report/`, `test-results/`, `payload.db` |

---

## Stack

- [Payload CMS 3](https://payloadcms.com) · [Next.js App Router](https://nextjs.org) · SQLite (swap adapter in `payload.config.ts`)
- Tailwind CSS v4 · Playwright · Figma MCP (in Cursor)

---

## License

MIT — see [Payload Website Template](https://github.com/payloadcms/payload/blob/main/templates/website) upstream license terms.

---

<details>
<summary>Original Payload Website Template README (features)</summary>

See upstream template for: layout builder, draft/live preview, SEO plugin, search, redirects, jobs, deployment guides.

```bash
pnpx create-payload-app my-project -t website
```

</details>
