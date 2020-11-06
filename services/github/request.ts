
const BASE_URL = 'https://api.github.com'

let localStorage
if (process.browser) {
  localStorage = window.localStorage
}

let token: string | undefined = localStorage?.getItem('GITHUB_ACCESS_TOKEN')

export function setToken(newToken: string) {
  localStorage?.setItem('GITHUB_ACCESS_TOKEN', newToken)
  token = newToken
}

export function clearToken() {
  localStorage?.removeItem('GITHUB_ACCESS_TOKEN')
  token = undefined
}

export function request(
  method: string,
  url: string,
  body?: any,
  config: Partial<Request> = {}
) {
  if (token) {
    (config as any).headers = {
      ...(config.headers || {}),
      Authorization: `token ${token}`
    }
  }
  url = url.startsWith('http')
    ? url
    : `${BASE_URL}${url}`
  return fetch(url, {
    method,
    body: body && (
      typeof body === 'string'
        ? body
        : JSON.stringify(body)
    ),
    ...config
  }).then((res) => {
    return res.text()
  }).then((text) => {
    try {
      return JSON.parse(text)
    } catch {
      if (text.includes('&')) {
        const result = {}
        text.split('&').forEach((part) => {
          const [key, value] = part.split('=')
          result[key] = isNaN(value as any)
            ? decodeURIComponent(value)
            : Number(value)
        })
        return result
      }
      return text
    }
  })
}

export function proxyRequest(
  method: string,
  url: string,
  body?: any,
  config: Partial<Request> = {}
) {
  (config as any).headers = {
    ...(config.headers || {}),
    origin: 'http://localhost:3000',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  url = url.startsWith('http')
    ? url
    : `${BASE_URL}${url}`
  return request(method, `https://cors-anywhere.herokuapp.com/${url}`, body, config)
}
