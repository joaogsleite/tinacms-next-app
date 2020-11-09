interface IData {
  cmsEnabled?: boolean
  token?: string
}

class LocalStorage {
  
  private data: IData = {}

  private getValue<T extends keyof IData>(name: T) {
    if (process.browser) {
      if (this.data[name] === undefined) {
        const parsed = localStorage.getItem(name)
        if (parsed !== undefined) {
          this.data[name] = JSON.parse(parsed)
        }
      }
    }
    const value = this.data[name]
    console.log(`LocalStorage.getValue(${name}): ${value}`)
    return value
  }

  private setValue<T extends keyof IData>(name: T, value: IData[T]) {
    console.log(`LocalStorage.setValue(${name}, ${value})`)
    if (process.browser) {
      if (value === undefined) {
        localStorage.removeItem(name)
      } else {
        localStorage.setItem(name, JSON.stringify(value))
      }
    }
    this.data[name] = value
  }

  get cmsEnabled() {
    return this.getValue('cmsEnabled')
  } 
  set cmsEnabled(value) {
    this.setValue('cmsEnabled', value)
  }

  get token() {
    return this.getValue('token')
  } 
  set token(value) {
    this.setValue('token', value)
  }
}

const singleton = new LocalStorage()
export default singleton