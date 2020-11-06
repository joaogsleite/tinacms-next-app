import fs from 'fs'
import path from 'path'

export async function parsePage(id: string) {
  const filepath = path.join('content', `${id}.json`)
  const text = await fs.promises.readFile(filepath, 'utf8')
  return JSON.parse(text)
}