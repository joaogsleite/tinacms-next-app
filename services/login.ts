import Request from './request'
import LocalStorage from './localStorage'
import * as github from './github'

const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://api.github.com'
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const BASE_HEADERS = {
  'origin': 'http://localhost',
  'Content-Type': 'application/x-www-form-urlencoded'
}

const githubApi = new Request(BASE_URL, BASE_HEADERS)

let device_code

export function isLoggedIn() {
  return github.isTokenValid()
}

export function logout() {
  LocalStorage.token = undefined
  return new Promise((resolve) => {
    setTimeout(resolve, 500)
  })
}

export async function generateCodes() {
  const body = {
    'client_id': GITHUB_CLIENT_ID,
    'scope': 'repo'
  }
  const url = 'https://github.com/login/device/code'
  const res = await githubApi.post(url, body)
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
          const res = await githubApi.post(url, body)
          if (res.access_token) {
            LocalStorage.token = res.access_token
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