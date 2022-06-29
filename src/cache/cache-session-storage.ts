import { CACHE_KEY_PREFIX, Cacheable, getKeyWithPrefix, ICache, removePrefixFromKey } from './shared'

/**
 * Implementation of caching that uses session storage
 * */
export class SessionStorageCache implements ICache {
  constructor(public prefix: string = CACHE_KEY_PREFIX) {}

  /**
   * It takes a key and an entry, and sets the entry in the session storage with the key
   * @param {string} key - The key to store the entry under.
   * @param {Cacheable} entry - The value to be stored in the cache.
   */
  public set<T = Cacheable>(key: string, entry: T) {
    window.sessionStorage.setItem(getKeyWithPrefix(key, this.prefix), JSON.stringify(entry))
  }

  /**
   * It gets the value of the key from the session storage, parses it as JSON, and returns it
   * @param {string} key - The key to store the data under.
   * @returns The value of the key in the sessionStorage.
   */
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

  /**
   * It removes the item from session storage with the given key
   * @param {string} key - The key to store the value under.
   */
  public remove(key: string) {
    window.sessionStorage.removeItem(getKeyWithPrefix(key, this.prefix))
  }

  /**
   * It returns an array of all the keys in the session storage that start with the prefix
   * @returns An array of all the keys in the sessionStorage that start with the prefix.
   */
  public allKeys() {
    return Object.keys(window.sessionStorage)
      .filter((key) => key.startsWith(this.prefix))
      .map((key) => removePrefixFromKey(key, this.prefix))
  }
}
