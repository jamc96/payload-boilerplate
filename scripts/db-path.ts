export function getDatabaseUrl(): string {
  return process.env.DATABASE_URL ?? 'file:./payload.db'
}

export function getSqlitePath(databaseUrl: string): string {
  if (databaseUrl.startsWith('file:')) {
    return databaseUrl.slice('file:'.length)
  }

  throw new Error(`Unsupported DATABASE_URL for local sqlite file: ${databaseUrl}`)
}
