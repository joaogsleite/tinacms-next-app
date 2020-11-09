
interface IHeaders {
  [key: string]: string
}

interface IConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  url: string
  headers?: IHeaders
  body?: any
}

export type IOptions = Partial<IConfig>

export default class Request {
  baseUrl: string
  baseHeaders: IHeaders
  constructor(baseUrl: string, baseHeaders: IHeaders = {}) {
    this.baseUrl = baseUrl
    this.baseHeaders = baseHeaders
  }
  private request(options: IConfig) {
    const url = options.url.startsWith('http')
      ? options.url
      : `${this.baseUrl}${options.url}`
    return fetch(url, {
      method: options.method,
      body: options.body && (
        typeof options.body === 'string'
          ? options.body
          : JSON.stringify(options.body)
        ),
      headers: {
        ...this.baseHeaders,
        ...(options.headers || {})
      },
    }).then((res) => {
      if (!res.ok) {
        throw res
      }
      return res.text().then((text) => {
        try {
          return JSON.parse(text)
        } catch {
          if(res.headers.get('Content-type').includes('x-www-form-urlencoded')) {
            const result = {}
            text.split('&').forEach((part) => {
              const [key, value] = part.split('=')
              result[key] = isNaN(value as any)
                ? decodeURIComponent(value)
                : Number(value)
            })
            return result
          }
        }
      })
    })
  }
  get(url: string, options: IOptions = {}) {
    return this.request({ method: 'GET', url, ...options })
  }
  post(url: string, body: any, options: IOptions = {}) {
    return this.request({ method: 'POST', url, body, ...options })
  }
  put(url: string, body: any, options: IOptions = {}) {
    return this.request({ method: 'PUT', url, body, ...options })
  }
  delete(url: string, options: IOptions = {}) {
    return this.request({ method: 'DELETE', url, ...options })
  }
  patch(url: string, body: any, options: IOptions = {}) {
    return this.request({ method: 'PATCH', url, body, ...options })
  }
}