import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const MIGRATIONS_DIR = path.join(ROOT, 'src/migrations')

const SCHEMA_PATH_PATTERN =
  /^(src\/(collections|fields|blocks|Footer|Header|plugins)\/|src\/payload\.config\.ts$)/
const TEST_ARTIFACT_PATTERN = /test_hook_check/i

function getStagedFiles(): string[] {
  const output = execSync('git diff --cached --name-only --diff-filter=ACMR', {
    cwd: ROOT,
    encoding: 'utf8',
  })
  return output.trim().split('\n').filter(Boolean)
}

function isSchemaFile(file: string): boolean {
  return SCHEMA_PATH_PATTERN.test(file)
}

function isMigrationFile(file: string): boolean {
  return file.startsWith('src/migrations/')
}

function snapshotMigrations(): Map<string, string> {
  const snapshot = new Map<string, string>()
  if (!fs.existsSync(MIGRATIONS_DIR)) {
    return snapshot
  }

  for (const entry of fs.readdirSync(MIGRATIONS_DIR)) {
    const fullPath = path.join(MIGRATIONS_DIR, entry)
    if (fs.statSync(fullPath).isFile()) {
      snapshot.set(entry, fs.readFileSync(fullPath, 'utf8'))
    }
  }
  return snapshot
}

function getChangedFiles(
  before: Map<string, string>,
  after: Map<string, string>,
): string[] {
  const changed: string[] = []
  for (const [file, content] of after) {
    if (!before.has(file) || before.get(file) !== content) {
      changed.push(path.join('src/migrations', file))
    }
  }
  return changed
}

function generateMigrationName(): string {
  const now = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}_auto`
}

function removeTestArtifacts(): void {
  if (!fs.existsSync(MIGRATIONS_DIR)) {
    return
  }

  for (const entry of fs.readdirSync(MIGRATIONS_DIR)) {
    if (!TEST_ARTIFACT_PATTERN.test(entry)) continue
    fs.unlinkSync(path.join(MIGRATIONS_DIR, entry))
    console.log(`Removed test artifact: src/migrations/${entry}`)
  }
}

function run(command: string): void {
  execSync(command, { cwd: ROOT, stdio: 'inherit' })
}

function exitMigrateCreateFailure(error: unknown): never {
  console.error('\nFailed to create migration (payload migrate:create).\n')
  console.error('Possible causes:')
  console.error('  - Missing or invalid .env (PAYLOAD_SECRET, DATABASE_URL)')
  console.error('  - Local DB not initialized — run: pnpm db:setup')
  console.error(`  - Node ${process.version} — if migrate:create fails, report to Payload/tsx`)
  console.error('\nTry manually:')
  console.error('  pnpm db:setup')
  console.error('  pnpm payload migrate:create --name <name>')
  console.error('\nSee docs/plans/database-collaboration-and-deployment-plan.md\n')
  if (error instanceof Error && error.message) {
    console.error(error.message)
  }
  process.exit(1)
}

const staged = getStagedFiles()
const schemaFiles = staged.filter(isSchemaFile)

if (schemaFiles.length === 0) {
  console.log('pre-commit: no staged schema files — skipping migration check')
  process.exit(0)
}

if (staged.some(isMigrationFile)) {
  console.log('pre-commit: schema + migration files staged — OK')
  process.exit(0)
}

console.log('pre-commit: schema files staged without migration — ensuring migration')
console.log(`  Schema files: ${schemaFiles.join(', ')}`)

try {
  run('pnpm db:migrate')
} catch {
  console.error('\npnpm db:migrate failed.')
  console.error('Ensure .env exists with PAYLOAD_SECRET and DATABASE_URL.')
  console.error('Run: pnpm db:setup')
  console.error('See docs/plans/database-collaboration-and-deployment-plan.md\n')
  process.exit(1)
}

const before = snapshotMigrations()
const migrationName = generateMigrationName()

try {
  run(`pnpm payload migrate:create --name ${migrationName}`)
} catch (error) {
  exitMigrateCreateFailure(error)
}

removeTestArtifacts()

const after = snapshotMigrations()
const changed = getChangedFiles(before, after).filter(
  (file) => !TEST_ARTIFACT_PATTERN.test(path.basename(file)),
)

if (changed.length === 0) {
  console.log('pre-commit: no DB schema diff — commit allowed without new migration')
  process.exit(0)
}

for (const file of changed) {
  execSync(`git add ${JSON.stringify(file)}`, { cwd: ROOT, stdio: 'inherit' })
}

console.log('pre-commit: auto-staged migration files:')
for (const file of changed) {
  console.log(`  + ${file}`)
}
