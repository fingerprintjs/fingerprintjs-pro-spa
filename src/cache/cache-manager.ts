import { CacheEntry, CacheKey, DEFAULT_CACHE_LIFE, DEFAULT_NOW_PROVIDER, ICache, WrappedCacheEntry } from './shared'

export class CacheManager {
  readonly nowProvider: () => number | Promise<number>

  constructor(
    private cache: ICache,
    private cacheTime: number = DEFAULT_CACHE_LIFE,
    nowProvider?: () => number | Promise<number>
  ) {
    this.nowProvider = nowProvider || DEFAULT_NOW_PROVIDER
  }

  async get<TExtended extends boolean>(cacheKey: CacheKey<TExtended>): Promise<CacheEntry<TExtended> | undefined> {
    const wrappedEntry = await this.cache.get<WrappedCacheEntry<TExtended>>(cacheKey.toKey())

    if (!wrappedEntry) {
      return
    }

    const now = await this.nowProvider()
    const nowSeconds = Math.floor(now / 1000)

    if (wrappedEntry.expiresAt < nowSeconds) {
      await this.cache.remove(cacheKey.toKey())

      return
    }

    return wrappedEntry.body
  }

  async set<TExtended extends boolean>(cacheKey: CacheKey<TExtended>, entry: CacheEntry): Promise<void> {
    const wrappedEntry = await this.wrapCacheEntry(entry)

    await this.cache.set(cacheKey.toKey(), wrappedEntry)
  }

  async clearCache() {
    const keys = await this.cache.allKeys()
    await Promise.all(keys.map((key) => this.cache.remove(key)))
  }

  private async wrapCacheEntry(entry: CacheEntry): Promise<WrappedCacheEntry> {
    const now = await this.nowProvider()
    const expiresInTime = Math.floor(now / 1000) + this.cacheTime

    return {
      body: entry,
      expiresAt: expiresInTime,
    }
  }
}
