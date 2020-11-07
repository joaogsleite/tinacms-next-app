
import { b64EncodeUnicode } from './encoding'
import { request, proxyRequest, clearToken } from './request'
import './login'

const { REPO_FULL_NAME } = process.env;

export function fetchPage(id: string) {
  const filename = `content/${id}.json`
  const headers = new Headers()
  headers.append('pragma', 'no-cache')
  headers.append('cache-control', 'no-cache')
  const url = `https://raw.githubusercontent.com/${REPO_FULL_NAME}/master/${filename}`
  return proxyRequest('GET', url, undefined, { headers })
}

export async function savePage(id: string, data: any) {
  const filename = `content/${id}.json`
  
  const file = await request('GET', `/repos/${REPO_FULL_NAME}/contents/${filename}`).catch(() => ({}))

  const body = {
    branch: 'master',
    message: 'Update content',
    content: b64EncodeUnicode(JSON.stringify(data, null, 2)),
    sha: file.sha
  }
  await request('PUT', `/repos/${REPO_FULL_NAME}/contents/${filename}`, body)
}