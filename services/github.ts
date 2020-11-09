import LocalStorage from './localStorage'
import Request from './request'

const REPO_FULL_NAME = process.env.REPO_FULL_NAME
const REPO_BRANCH = process.env.REPO_BRANCH || 'master'
const BASE_URL = 'https://api.github.com'
const BASE_HEADERS = {
  'Accept': 'application/vnd.github.v3+json',
  'Authorization': `token ${LocalStorage.token}`
}

const githubAPI = new Request(BASE_URL, BASE_HEADERS)

function b64EncodeUnicode(str: string) {
  return btoa(encodeURIComponent(str).replace(
    /%([0-9A-F]{2})/g,
    (_, p1) => String.fromCharCode('0x' + p1 as any)
  ))
}

function b64DecodeUnicode(str: string) {
  return decodeURIComponent(atob(str).split('').map(
    (c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  ).join(''))
}

export async function isTokenValid() {
  try {
    await githubAPI.patch(`/repos/${REPO_FULL_NAME}`, { is_template: false })
    return true
  } catch {
    LocalStorage.token = undefined
    return false
  }
}

export async function getFile(filepath: string) {
  const url = `/repos/${REPO_FULL_NAME}/contents/${filepath}?ref=${REPO_BRANCH}`
  const file = await githubAPI.get(url)
  return b64DecodeUnicode(file.content)
}

export async function saveFile(filepath: string, data: string) {
  const url = `/repos/${REPO_FULL_NAME}/contents/${filepath}?ref=${REPO_BRANCH}`
  const file = await githubAPI.get(url).catch(() => ({}))
  const body = {
    branch: REPO_BRANCH,
    message: 'Update content',
    content: b64EncodeUnicode(data),
    sha: file.sha
  }
  await githubAPI.put(url, body)
}