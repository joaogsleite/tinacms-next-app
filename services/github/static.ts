import fs from 'fs'
import path from 'path'

export async function getPages(...ids: string[]) {
  const folderpath = path.join('content', ...ids)
  const files = await fs.promises.readdir(folderpath)
  return files.map((file) => {
    return file.replace('.json', '')
  })
}

export async function parsePage(...ids: string[]) {
  const file = ids.pop()
  const filepath = path.join('content', ...ids, `${file}.json`)
  const text = await fs.promises.readFile(filepath, 'utf8')
  return JSON.parse(text)
}