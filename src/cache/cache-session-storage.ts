import { CACHE_KEY_PREFIX, Cacheable, getKeyWithPrefix, ICache, removePrefixFromKey } from './shared'

export class SessionStorageCache implements ICache {
  constructor(public prefix: string = CACHE_KEY_PREFIX) {}

  public set<T = Cacheable>(key: string, entry: T) {
    window.sessionStorage.setItem(getKeyWithPrefix(key, this.prefix), JSON.stringify(entry))
  }

  public get<T = Cacheable>(key: string) {
    const json = window.sessionStorage.getItem(getKeyWithPrefix(key, this.prefix))

    if (!json) {
      return
    }

    try {
      return JSON.parse(json) as T
    } catch (e) {
      return
    }
  }

  public remove(key: string) {
    window.sessionStorage.removeItem(getKeyWithPrefix(key, this.prefix))
  }

  public allKeys() {
    return Object.keys(window.sessionStorage)
      .filter((key) => key.startsWith(this.prefix))
      .map((key) => removePrefixFromKey(key, this.prefix))
  }
}
