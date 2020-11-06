import { proxyRequest, setToken } from "./request"

const { 
  GITHUB_CLIENT_ID,
} = process.env

let device_code

export async function login() {
  const body = `client_id=${GITHUB_CLIENT_ID}&scope=repo`
  const res = await proxyRequest('POST', 'https://github.com/login/device/code', body)
  device_code = res.device_code
  console.log({ device_code, user_code: res.user_code })
  return {
    device_code,
    user_code: res.user_code,
  }
}

export function openWindow() {
  const popup = window.open('https://github.com/login/device', '', "width=400,height=600")
  const timer = setInterval(() => { 
    if(popup.closed) {
      clearInterval(timer);
      check()
    }
  }, 500);
}

async function check() {
  const body = `client_id=${GITHUB_CLIENT_ID}&device_code=${device_code}&grant_type=urn:ietf:params:oauth:grant-type:device_code`
  const res = await proxyRequest('POST', 'https://github.com/login/oauth/access_token', body)
  setToken(res.access_token)
}

if (process.browser) {
  (window as any).github_login = login as any
  (window as any).github_openWindow = openWindow as any
  (window as any).github_check = check as any
}