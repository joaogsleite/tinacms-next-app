
const BASE_URL = 'https://api.github.com'

let localStorage
if (process.browser) {
  localStorage = window.localStorage
}

let token: string | undefined = localStorage?.getItem('GITHUB_ACCESS_TOKEN')

export function setToken(newToken: string) {
  if (newToken) {
    localStorage?.setItem('GITHUB_ACCESS_TOKEN', newToken)
    token = newToken
  }
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
  (config as any).headers = config.headers || new Headers()
  if (token) {
    config.headers.append('Authorization', `token ${token}`)
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
    if (!res.ok) {
      throw res
    }
    return res.text().then((text) => {
      try {
        return JSON.parse(text)
      } catch {
        if(res.headers.get('Content-type') === 'application/x-www-form-urlencoded; charset=utf-8') {
          const result = {}
          text.split('&').forEach((part) => {
            const [key, value] = part.split('=')
            result[key] = isNaN(value as any)
              ? decodeURIComponent(value)
              : Number(value)
          })
          return result
        }
        console.log('text', text)
      }
    })
  })
}

export function proxyRequest(
  method: string,
  url: string,
  body?: any,
  config: Partial<Request> = {}
) {
  (config as any).headers = config.headers || new Headers()
  config.headers.append('origin', 'http://localhost')
  config.headers.append('Content-Type', 'application/x-www-form-urlencoded')
  url = url.startsWith('http')
    ? url
    : `${BASE_URL}${url}`
  body = body && Object.keys(body).map((key) => {
    return `${key}=${body[key]}`
  }).join('&')
  return request(method, `https://cors-anywhere.herokuapp.com/${url}`, body, config)
}
