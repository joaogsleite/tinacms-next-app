
import { b64EncodeUnicode } from './encoding'
import { request, proxyRequest, clearToken } from './request'
import './login'

const { REPO_FULL_NAME } = process.env;

export async function fetchPage(id: string, defaultData: any = {}) {
  const filename = `content/${id}.json`
  const headers = new Headers()
  headers.append('pragma', 'no-cache')
  headers.append('cache-control', 'no-cache')
  const url = `https://raw.githubusercontent.com/${REPO_FULL_NAME}/master/${filename}`
  let data
  try {
    data = await proxyRequest('GET', url, undefined, { headers }) || {}
  } catch {
    data = {}
  }
  Object.keys(defaultData).forEach((key) => {
    if (!data[key]) {
      data[key] = defaultData[key]
    }
  })
  return data
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