import { Cacheable, ICache } from './shared'

/**
 * Implementation of caching that uses in-memory storage
 * */
export class InMemoryCache {
  public enclosedCache: ICache = (function () {
    const cache: Record<string, unknown> = {}

    return {
      set<T = Cacheable>(key: string, entry: T) {
        cache[key] = entry
      },

      get<T = Cacheable>(key: string) {
        const cacheEntry = cache[key] as T

        if (!cacheEntry) {
          return
        }

        return cacheEntry
      },

      remove(key: string) {
        delete cache[key]
      },

      allKeys(): string[] {
        return Object.keys(cache)
      },
    }
  })()
}
