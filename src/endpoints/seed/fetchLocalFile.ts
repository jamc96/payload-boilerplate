import { readFile } from 'node:fs/promises'
import path from 'node:path'
import type { File } from 'payload'

const MIME_BY_EXT: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
}

/** Load a committed file from `public/` for Payload media seeding. */
export async function fetchLocalFile(relativePublicPath: string): Promise<File> {
  const normalized = relativePublicPath.replace(/^\/+/, '')
  const absolutePath = path.join(process.cwd(), 'public', normalized)
  const data = await readFile(absolutePath)
  const name = path.basename(absolutePath)
  const ext = path.extname(name).toLowerCase()

  return {
    name,
    data,
    mimetype: MIME_BY_EXT[ext] ?? 'application/octet-stream',
    size: data.byteLength,
  }
}
