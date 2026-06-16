/**
 * Install required agent skills into another Payload project (Plan A).
 *
 * Usage (from this repo):
 *   pnpm skills:install /path/to/other-payload-project
 *   pnpm skills:install /path/to/other-payload-project --deps
 *   pnpm skills:install /path/to/other-payload-project --config
 *
 * Verify in any project:
 *   pnpm skills:verify
 *   pnpm skills:verify /path/to/project
 */
import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DEFAULT_SOURCE_ROOT = resolve(__dirname, '..')

/** All four skills are mandatory for the Figma → Payload workflow. */
const REQUIRED_SKILLS = ['payload', 'figma-payload-cms', 'playwright', 'playwright-cli'] as const

const MANIFEST_VERSION = 1

const AGENTS_MARKER = 'payload-figma-agent-skills'

const AGENTS_MD_BLOCK = `<!-- ${AGENTS_MARKER} -->
This project uses agent skills:

**Payload CMS** (required) — \`.agents/skills/payload/SKILL.md\`
**Figma → Payload** (required) — \`.agents/skills/figma-payload-cms/SKILL.md\`
**Playwright** (required) — \`.agents/skills/playwright/SKILL.md\`
**Playwright CLI** (required) — \`.agents/skills/playwright-cli/SKILL.md\`

**Migrate / fork:** [.agents/MIGRATE.md](.agents/MIGRATE.md) · [STACK_SETUP.md](.agents/skills/figma-payload-cms/STACK_SETUP.md)

**Playwright workflow** — \`.agents/skills/figma-payload-cms/playwright-qa.md\`
**Build vs QA:** one subagent per section — [subagent-strategy.md](.agents/skills/figma-payload-cms/subagent-strategy.md)

**Per-project config:** \`docs/FIGMA_PAYLOAD_PROJECT.md\`
**Example page plan (reference only):** \`.agents/skills/figma-payload-cms/examples/EXAMPLE_PAGE_PLAN.md\`
`

const AGENTS_MD_FULL = `# Agents

${AGENTS_MD_BLOCK}`

type AgentsMode = 'merge' | 'replace' | 'skip'

type ParsedArgs = {
  command: 'install' | 'verify'
  target: string
  source: string
  agents: AgentsMode
  deps: boolean
  config: boolean
  dryRun: boolean
}

function parseArgs(argv: string[]): ParsedArgs {
  const args = [...argv]
  const command = args[0] === 'verify' ? 'verify' : 'install'
  if (args[0] === 'install' || args[0] === 'verify') {
    args.shift()
  }

  let target = process.cwd()
  let source = DEFAULT_SOURCE_ROOT
  let agents: AgentsMode = 'merge'
  let deps = false
  let config = false
  let dryRun = false

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (arg === '--target' || arg === '-t') {
      target = resolve(args[++i] ?? '')
      continue
    }
    if (arg === '--from' || arg === '-f') {
      source = resolve(args[++i] ?? '')
      continue
    }
    if (arg === '--agents') {
      const mode = args[++i] as AgentsMode
      if (mode !== 'merge' && mode !== 'replace' && mode !== 'skip') {
        throw new Error(`Invalid --agents value: ${mode}. Use merge, replace, or skip.`)
      }
      agents = mode
      continue
    }
    if (arg === '--deps') {
      deps = true
      continue
    }
    if (arg === '--config') {
      config = true
      continue
    }
    if (arg === '--dry-run') {
      dryRun = true
      continue
    }
    if (arg === '--help' || arg === '-h') {
      printHelp()
      process.exit(0)
    }
    if (!arg.startsWith('-')) {
      target = resolve(arg)
      continue
    }
    throw new Error(`Unknown argument: ${arg}`)
  }

  return { command, target, source, agents, deps, config, dryRun }
}

function printHelp(): void {
  console.log(`
Install required Payload + Figma + Playwright agent skills into another project.

Commands:
  install [target]   Copy skills (default command)
  verify [target]    Check required skills are present

Options:
  --target, -t <path>   Target project root (default: cwd)
  --from, -f <path>     Skill source repo (default: parent of this script)
  --agents <mode>       merge | replace | skip (default: merge)
  --deps                pnpm add -D @playwright/test @playwright/cli tsx cross-env dotenv
  --config              Copy project-config template if docs/FIGMA_PAYLOAD_PROJECT.md missing
  --dry-run             Print actions without writing files

Examples:
  pnpm skills:install ../my-payload-site
  pnpm skills:install ../my-payload-site --deps --config
  pnpm skills:verify ../my-payload-site
`)
}

function assertDirectory(path: string, label: string): void {
  if (!existsSync(path)) {
    throw new Error(`${label} not found: ${path}`)
  }
}

function skillSourceDir(sourceRoot: string, skill: string): string {
  return resolve(sourceRoot, '.agents/skills', skill)
}

function skillTargetDir(targetRoot: string, skill: string): string {
  return resolve(targetRoot, '.agents/skills', skill)
}

function copySkill(sourceRoot: string, targetRoot: string, skill: string, dryRun: boolean): void {
  const from = skillSourceDir(sourceRoot, skill)
  const to = skillTargetDir(targetRoot, skill)
  assertDirectory(from, `Skill source (${skill})`)
  console.log(`  copy ${skill} → ${to}`)
  if (!dryRun) {
    mkdirSync(resolve(targetRoot, '.agents/skills'), { recursive: true })
    cpSync(from, to, { recursive: true })
  }
}

function writeManifest(targetRoot: string, dryRun: boolean): void {
  const manifestPath = resolve(targetRoot, '.agents/skills/manifest.json')
  const manifest = {
    version: MANIFEST_VERSION,
    package: 'payload-figma-boilerplate',
    required: [...REQUIRED_SKILLS],
    installedAt: new Date().toISOString(),
  }
  console.log(`  write ${manifestPath}`)
  if (!dryRun) {
    writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
  }
}

function mergeAgentsMd(targetRoot: string, mode: AgentsMode, dryRun: boolean): void {
  if (mode === 'skip') {
    console.log('  skip AGENTS.md (--agents skip)')
    return
  }

  const agentsPath = resolve(targetRoot, 'AGENTS.md')
  if (mode === 'replace' || !existsSync(agentsPath)) {
    console.log(`  write AGENTS.md (${mode === 'replace' ? 'replace' : 'create'})`)
    if (!dryRun) {
      writeFileSync(agentsPath, `${AGENTS_MD_FULL}\n`)
    }
    return
  }

  const existing = readFileSync(agentsPath, 'utf8')
  if (existing.includes(AGENTS_MARKER)) {
    console.log('  AGENTS.md already contains skill block (marker found)')
    return
  }

  const hasAllPaths = REQUIRED_SKILLS.every((skill) =>
    existing.includes(`.agents/skills/${skill}/SKILL.md`),
  )
  if (hasAllPaths) {
    console.log('  AGENTS.md already references all required skills')
    return
  }

  console.log('  append skill block to AGENTS.md')
  if (!dryRun) {
    const separator = existing.endsWith('\n') ? '\n' : '\n\n'
    writeFileSync(agentsPath, `${existing}${separator}${AGENTS_MD_BLOCK}\n`)
  }
}

function copyMigrateDoc(sourceRoot: string, targetRoot: string, dryRun: boolean): void {
  const from = resolve(sourceRoot, '.agents/MIGRATE.md')
  const to = resolve(targetRoot, '.agents/MIGRATE.md')
  if (!existsSync(from)) {
    console.warn(`  warn: ${from} missing — skipped`)
    return
  }
  console.log(`  copy MIGRATE.md → ${to}`)
  if (!dryRun) {
    mkdirSync(resolve(targetRoot, '.agents'), { recursive: true })
    cpSync(from, to)
  }
}

function copyProjectConfigTemplate(sourceRoot: string, targetRoot: string, dryRun: boolean): void {
  const docsDir = resolve(targetRoot, 'docs')
  const dest = resolve(docsDir, 'FIGMA_PAYLOAD_PROJECT.md')
  if (existsSync(dest)) {
    console.log('  docs/FIGMA_PAYLOAD_PROJECT.md already exists — skipped')
    return
  }
  const from = resolve(
    sourceRoot,
    '.agents/skills/figma-payload-cms/project-config.template.md',
  )
  assertDirectory(dirname(from), 'project-config.template.md parent')
  console.log(`  copy project-config.template.md → ${dest}`)
  if (!dryRun) {
    mkdirSync(docsDir, { recursive: true })
    cpSync(from, dest)
  }
}

function installDeps(targetRoot: string, dryRun: boolean): void {
  const pkgPath = resolve(targetRoot, 'package.json')
  if (!existsSync(pkgPath)) {
    throw new Error(`package.json not found in target: ${targetRoot}`)
  }
  const cmd =
    'pnpm add -D @playwright/test @playwright/cli tsx cross-env dotenv'
  console.log(`  run: ${cmd}`)
  if (!dryRun) {
    execSync(cmd, { cwd: targetRoot, stdio: 'inherit' })
  }
}

function verifySkills(targetRoot: string): { ok: boolean; errors: string[] } {
  const errors: string[] = []

  for (const skill of REQUIRED_SKILLS) {
    const skillMd = resolve(skillTargetDir(targetRoot, skill), 'SKILL.md')
    if (!existsSync(skillMd)) {
      errors.push(`Missing required skill: ${skillMd}`)
    }
  }

  const manifestPath = resolve(targetRoot, '.agents/skills/manifest.json')
  if (!existsSync(manifestPath)) {
    errors.push(`Missing manifest: ${manifestPath}`)
  } else {
    try {
      const manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as {
        required?: string[]
      }
      for (const skill of REQUIRED_SKILLS) {
        if (!manifest.required?.includes(skill)) {
          errors.push(`Manifest does not list required skill: ${skill}`)
        }
      }
    } catch {
      errors.push(`Invalid JSON: ${manifestPath}`)
    }
  }

  const agentsPath = resolve(targetRoot, 'AGENTS.md')
  if (existsSync(agentsPath)) {
    const agents = readFileSync(agentsPath, 'utf8')
    for (const skill of REQUIRED_SKILLS) {
      if (!agents.includes(`.agents/skills/${skill}/SKILL.md`)) {
        errors.push(`AGENTS.md does not reference .agents/skills/${skill}/SKILL.md`)
      }
    }
  } else {
    errors.push(`Missing AGENTS.md: ${agentsPath}`)
  }

  return { ok: errors.length === 0, errors }
}

function runInstall(parsed: ParsedArgs): void {
  const { target, source, agents, deps, config, dryRun } = parsed

  console.log(`\nInstall agent skills`)
  console.log(`  source: ${source}`)
  console.log(`  target: ${target}`)
  if (dryRun) console.log('  (dry run — no files written)\n')

  assertDirectory(resolve(source, '.agents/skills'), 'Source .agents/skills')
  assertDirectory(target, 'Target project root')

  const targetPkg = resolve(target, 'package.json')
  if (!existsSync(targetPkg)) {
    console.warn(`  warn: no package.json at ${target} — is this the project root?`)
  }

  console.log('\nCopy required skills (all four are mandatory):')
  for (const skill of REQUIRED_SKILLS) {
    copySkill(source, target, skill, dryRun)
  }

  writeManifest(target, dryRun)
  copyMigrateDoc(source, target, dryRun)
  mergeAgentsMd(target, agents, dryRun)

  if (config) {
    console.log('\nProject config:')
    copyProjectConfigTemplate(source, target, dryRun)
  }

  if (deps) {
    console.log('\nDev dependencies:')
    installDeps(target, dryRun)
  }

  if (!dryRun) {
    const result = verifySkills(target)
    if (!result.ok) {
      console.error('\nInstall finished but verification failed:')
      for (const err of result.errors) console.error(`  - ${err}`)
      process.exit(1)
    }
  }

  console.log('\nDone. Required skills installed:')
  for (const skill of REQUIRED_SKILLS) {
    console.log(`  - .agents/skills/${skill}/SKILL.md`)
  }
  console.log('\nNext steps in the target project:')
  console.log('  1. Fill docs/FIGMA_PAYLOAD_PROJECT.md (use --config if you skipped it)')
  console.log('  2. See .agents/skills/figma-payload-cms/STACK_SETUP.md for scaffold + scripts')
  console.log('  3. Run pnpm skills:verify in the target repo')
}

function runVerify(parsed: ParsedArgs): void {
  const { target } = parsed
  console.log(`\nVerify agent skills in: ${target}`)
  const result = verifySkills(target)
  if (result.ok) {
    console.log('\nAll required skills are present.')
    process.exit(0)
  }
  console.error('\nVerification failed:')
  for (const err of result.errors) console.error(`  - ${err}`)
  console.error('\nFix: run skills:install from payload-figma-boilerplate')
  process.exit(1)
}

try {
  const parsed = parseArgs(process.argv.slice(2))
  if (parsed.command === 'verify') {
    runVerify(parsed)
  } else {
    runInstall(parsed)
  }
} catch (error) {
  const message = error instanceof Error ? error.message : String(error)
  console.error(`\nError: ${message}`)
  printHelp()
  process.exit(1)
}
