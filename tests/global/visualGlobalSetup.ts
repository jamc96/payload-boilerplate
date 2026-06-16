import { seedDemoPage } from '../helpers/seedDemoPage'

/**
 * Seeds once before all visual workers. Skip when a parent orchestrator already
 * seeded (e.g. parallel QA subagents): SKIP_VISUAL_SEED=1 pnpm test:visual ...
 */
export default async function visualGlobalSetup(): Promise<void> {
  if (process.env.SKIP_VISUAL_SEED === '1') {
    return
  }

  await seedDemoPage()
}
