import { ICache, Cacheable, CACHE_KEY_PREFIX, getKeyWithPrefix, removePrefixFromKey } from './shared'

/**
 * Implementation of caching that uses local storage
 * */
export class LocalStorageCache implements ICache {
  constructor(public prefix: string = CACHE_KEY_PREFIX) {}

  public set<T = Cacheable>(key: string, entry: T) {
    window.localStorage.setItem(getKeyWithPrefix(key, this.prefix), JSON.stringify(entry))
  }

  public get<T = Cacheable>(key: string) {
    const json = window.localStorage.getItem(getKeyWithPrefix(key, this.prefix))

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
    window.localStorage.removeItem(getKeyWithPrefix(key, this.prefix))
  }

  public allKeys() {
    return Object.keys(window.localStorage)
      .filter((key) => key.startsWith(this.prefix))
      .map((key) => removePrefixFromKey(key, this.prefix))
  }
}
