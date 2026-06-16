/**
 * Verify local Figma reference PNGs exist (Phase 0 cache).
 * Run: pnpm figma:refs:check
 *
 * PNGs are gitignored — export once via Phase 0 (see scripts/figma-refs-setup.md).
 */
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const refsRoot = path.join(repoRoot, 'references/figma/example-home')

const BREAKPOINTS = [
  { folder: 'desktop-1280', label: 'Desktop 1280' },
  { folder: 'tablet-800', label: 'Tablet 800' },
  { folder: 'mobile-375', label: 'Mobile 375' },
] as const

const DESKTOP_SECTIONS = [
  'full-page.png',
  'full-page-above-fold.png',
  'site-header.png',
  'site-hero.png',
  'block-logoCloud.png',
  'block-benefits.png',
  'block-featureSplit.png',
  'block-comparisonTable.png',
  'block-testimonial.png',
  'block-processSteps.png',
  'block-mediaHero.png',
  'block-ctaCentered.png',
  'site-footer.png',
] as const

const manifestPath = path.join(refsRoot, 'MANIFEST.md')

if (!existsSync(manifestPath)) {
  console.error(`Missing manifest: ${manifestPath}`)
  console.error('See scripts/figma-refs-setup.md for Phase 0 export steps.')
  process.exit(1)
}

const missing: string[] = []

for (const { folder, label } of BREAKPOINTS) {
  const dir = path.join(refsRoot, folder)
  const files = folder === 'desktop-1280' ? DESKTOP_SECTIONS : DESKTOP_SECTIONS.filter((f) => !f.startsWith('full-page'))

  for (const file of files) {
    const filePath = path.join(dir, file)
    if (!existsSync(filePath)) {
      missing.push(`${label}: ${folder}/${file}`)
    }
  }
}

if (missing.length === 0) {
  console.log('Figma reference cache OK — all expected PNGs present under references/figma/example-home/')
  process.exit(0)
}

console.error('Figma reference cache incomplete. Missing files:\n')
for (const entry of missing) {
  console.error(`  - ${entry}`)
}
console.error('\nExport once in Phase 0 — agents should read local PNGs, not re-call Figma MCP every run.')
console.error('Setup guide: scripts/figma-refs-setup.md')
process.exit(1)
