import { request, proxyRequest, setToken } from "./request"

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const REPO_FULL_NAME = process.env.REPO_FULL_NAME

let device_code

export async function isLoggedIn() {
  try {
    const body = { is_template: false }
    await request('PATCH', `/repos/${REPO_FULL_NAME}`, body)
    return true
  } catch (error) {
    return false
  }
}

export async function generateCodes() {
  const body = {
    'client_id': GITHUB_CLIENT_ID,
    'scope': 'repo'
  }
  const url = 'https://github.com/login/device/code'
  const res = await proxyRequest('POST', url, body)
  device_code = res.device_code
  const user_code = res.user_code
  console.log({ device_code, user_code })
  return { user_code }
}

export function startLogin() {
  return new Promise((resolve, reject) => {
    const url = 'https://github.com/login/device'
    const popup = window.open(url, '', "width=400,height=600")
    const timer = setInterval(async () => { 
      if(popup.closed) {
        clearInterval(timer);
        const body = {
          device_code,
          client_id: GITHUB_CLIENT_ID,
          grant_type: 'urn:ietf:params:oauth:grant-type:device_code'
        }
        const url = 'https://github.com/login/oauth/access_token'
        try {
          const res = await proxyRequest('POST', url, body)
          if (res.access_token) {
            setToken(res.access_token)
            resolve()
          } else {
            reject()
          }
        } catch {
          reject()
        }
      }
    }, 500);
  })
}