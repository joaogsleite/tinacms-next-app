import * as github  from './github'

let fs, path
if (!process.browser) {
  Promise.all([
    import('fs'),
    import('path')
  ]).then((imports) => {
    fs = imports[0] 
    path = imports[1]
  })
}

export function slugify(value: string = '') {
  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
  const p = new RegExp(a.split('').join('|'), 'g')
  return value.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

export async function getPages(id: string) {
  const files = process.browser
    ? [] // TODO: browser service part
    : await fs.promises.readdir(path.join('content', ...id.split('/')))
  return files.map((file) => {
    return file.replace('.json', '')
  })
}

export async function fetchPage(id: string) {
  const filepath = `content/${id}.json`
  const contents = process.browser
    ? await github.getFile(filepath)
    : await fs.promises.readFile(path.join(...filepath.split('/')), 'utf8')
  return JSON.parse(contents)
}

export async function savePage(id: string, data: any) {
  const filepath = `content/${id}.json`
  process.browser
    ? await github.saveFile(filepath, JSON.stringify(data, null, 2))
    : await [] // TODO: backend service part
}