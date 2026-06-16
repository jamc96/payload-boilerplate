# Figma spacing patterns (vertical rhythm)

Design-agnostic. Values below are **common in product-marketing Figma files** — always override with `get_design_context` output for the target section node.

Read **`docs/FIGMA_PAYLOAD_PROJECT.md`** for CSS token prefix (`--{prefix}-section-pt`, etc.) and shared component names (`SectionContainer`, `SectionHeader`, …).

## The #1 bug: doubled section padding

```tsx
// ❌ Anti-pattern — adds extra space at every section boundary
<section className="py-[var(--{prefix}-section-padding-y)]">
  <div className="border-t pt-[60px]">...</div>
</section>
```

Figma uses **one** vertical rhythm per section — not symmetric outer `py` **plus** inner `border-t pt`.

## Section models (pick per block from Figma MCP)

### Pattern A — bottom-only outer + inner bordered band

Outer: **`pb-*` only**. Inner band: `border-t` + `pt-*` + flex `gap-*`. Full-width siblings (e.g. image) sit **outside** the inner band.

```tsx
<section className="pb-[var(--{prefix}-section-pb)]">
  <SectionContainer className="flex flex-col">
    <div className="flex flex-col gap-[var(--{prefix}-gap-stack)] border-t border-[var(--{prefix}-divider)] pb-[inner-pb] pt-[var(--{prefix}-section-pt)]">
      <SectionHeader ... />
      {/* rows / grid */}
    </div>
    {/* optional full-width media sibling */}
  </SectionContainer>
</section>
```

Split-column variant: outer **`pb-*` only**, no top padding; one column gets `border-t pt-*`.

### Pattern B — border-t section, asymmetric pt/pb

Single wrapper: `border-t pt-[section-pt] pb-[section-pb]`. Stack children with flex `gap-*` — **no extra `mt-*`** between header and content.

```tsx
<section className="border-t border-[var(--{prefix}-divider)] pb-[var(--{prefix}-section-pb)] pt-[var(--{prefix}-section-pt)]">
  <SectionContainer className="flex flex-col gap-[header-to-content]">
    {/* header row */}
    {/* grid / table */}
  </SectionContainer>
</section>
```

### Pattern C — minimal vertical padding

Compact sections: symmetric `py-*` only when **no** inner `border-t pt-*` (e.g. logo strip, spacer media block).

### Hero — prefer flex `gap`, not margin on child

If Figma shows `flex-col gap-[Npx]` between headline and media:

```tsx
<SectionContainer className="flex flex-col gap-[mobile] md:gap-[tablet] xl:gap-[desktop]">
  <h1>...</h1>
  <div>{media}</div>
</SectionContainer>
```

Avoid `mt-[large]` on the media element when the parent already controls rhythm.

## Token conventions (define per project)

| Role | Typical px | Tailwind examples |
|------|------------|-------------------|
| Section top (after border-t) | 80 | `pt-20` |
| Section bottom | 120 | `pb-[120px]` |
| Header stack gap | 40–50 | `gap-10` / `gap-[50px]` |
| Column gap | 20 | `gap-5` |

Store as CSS variables with **your prefix** in project config.

**Never** apply symmetric `py-*` on `<section>` when a child also uses `border-t pt-*`.

## Internal gaps — extract from MCP, don't assume

For each block in the page plan, record from `get_design_context`:

| Element | What to capture |
|---------|-----------------|
| SectionHeader | gap between eyebrow, headline, body |
| Header → content | flex `gap` or `pt` on content band |
| List / card rows | `border-t`, row `py-*`, icon→text gap |
| Header row → grid | single flex `gap` (often 60–80px) |

## Section boundary review

Use **`full-page.png`** visual snapshot (see [visual-qa.md](visual-qa.md)).

Check each adjacent pair: previous section **bottom** + next section **top** should match Figma frame stack, not double.

Common mistake: previous block `pb-120` + next block outer `pt-80` + inner `pt-60` → ~260px instead of ~180–200px.

## Spacing audit (per-section QA subagents)

Run **one readonly QA subagent per section** — not one agent for the whole page. Full workflow: [subagent-strategy.md](subagent-strategy.md).

### QA subagent prompt (single section)

```
Role: QA only — readonly. You did NOT build this section.

Audit vertical spacing for ONE section in {repo} vs Figma fileKey {key}, node {nodeId}.
Read docs/FIGMA_PAYLOAD_PROJECT.md. Read {Component path} only (+ shared SectionHeader if used).
Compare outer pt/pb, inner border-t+pt, flex gaps vs get_design_context.
Verdict: PASS | FAIL. Rank fixes by visual impact. Flag symmetric py-* + inner border-t pt-* doubling.
Output exact className changes. Do NOT edit files.
```

Run after functional build (Phase 3) and after polish (Phase 6C). Re-run QA for any section that was fixed.
