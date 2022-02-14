import {
  CacheKey,
  CacheManager,
  DEFAULT_CACHE_LIFE,
  ICache,
  InMemoryCache,
  LocalStorageCache,
  SessionStorageCache,
} from '../cache'
import { GetResult } from '@fingerprintjs/fingerprintjs-pro'
import { GetOptions } from '../global'

const defaultKey = new CacheKey({
  tag: 'my-tag',
  linkedId: 'account_1',
  extendedResult: false,
})

const defaultData: GetResult = {
  requestId: '1644418085889.ABC123',
  visitorId: 'a1b2c3d4e5F6G7H8I9G0',
  visitorFound: true,
  confidence: {
    score: 0.99,
  },
}

const cacheFactories = [
  { new: () => new LocalStorageCache(), name: 'LocalStorageCache' },
  { new: () => new SessionStorageCache(), name: 'SessionStorageCache' },
  { new: () => new InMemoryCache().enclosedCache, name: 'InMemoryCache' },
]

cacheFactories.forEach((cacheFactory) => {
  describe(`CacheManager using ${cacheFactory.name}`, () => {
    let manager: CacheManager
    let cache: ICache

    beforeEach(() => {
      cache = cacheFactory.new()
      manager = new CacheManager(cache)
    })

    it('returns undefined when there is nothing in the cache', async () => {
      const result = await manager.get(defaultKey)

      expect(result).toBeFalsy()
    })

    it('should return an entry directly from the cache if the key matches exactly (default prefix)', async () => {
      await manager.set(defaultKey, defaultData)
      const result = await manager.get(defaultKey)

      expect(result).toStrictEqual(defaultData)
    })

    it('should clear cache', async () => {
      const key1 = defaultKey
      const key2 = new CacheKey({ ...defaultKey, tag: 'my-tag-2' } as GetOptions<false>)
      await manager.set(key1, defaultData)
      await manager.set(key2, defaultData)

      expect(cache.allKeys()).toHaveLength(2)
      await manager.clearCache()
      expect(cache.allKeys()).toHaveLength(0)
    })

    describe(`cache time`, () => {
      beforeEach(() => {
        jest.useFakeTimers()
      })

      afterEach(() => {
        jest.runOnlyPendingTimers()
        jest.useRealTimers()
      })

      it(`shouldn't return an entry from the cache if it's expired (default cache time)`, async () => {
        jest.useFakeTimers()
        await manager.set(defaultKey, defaultData)
        jest.advanceTimersByTime((DEFAULT_CACHE_LIFE + 1) * 1000)
        const result = await manager.get(defaultKey)

        expect(result).toBeFalsy()
      })

      it(`shouldn't return an entry from the cache if it's expired (custom cache time)`, async () => {
        jest.useFakeTimers()
        const cacheTime = 5 * 60
        manager = new CacheManager(cache, cacheTime)
        await manager.set(defaultKey, defaultData)
        jest.advanceTimersByTime((cacheTime + 1) * 1000)
        const result = await manager.get(defaultKey)

        expect(result).toBeFalsy()
      })
    })
  })

  describe(`${cacheFactory.name}`, () => {
    let cache: ICache

    beforeEach(() => {
      cache = cacheFactory.new()
    })

    afterEach(() => {
      sessionStorage.clear()
      localStorage.clear()
    })

    it('should return all cache keys', async () => {
      const key1 = defaultKey.toKey()
      const key2 = new CacheKey({ ...defaultKey, tag: 'my-tag-2' } as GetOptions<false>).toKey()
      await cache.set(key1, defaultData)
      await cache.set(key2, defaultData)

      // keys order is non-deterministic
      expect(await cache.allKeys()).toEqual(expect.arrayContaining([key1, key2]))
    })

    it('should serialize tags before making cache keys', async () => {
      const key1 = new CacheKey({ ...defaultKey, tag: { category: 'my-category-1' } } as GetOptions<false>).toKey()
      const key2 = new CacheKey({ ...defaultKey, tag: { category: 'my-category-2' } } as GetOptions<false>).toKey()
      await cache.set(key1, defaultData)
      await cache.set(key2, defaultData)

      // keys order is non-deterministic
      expect(await cache.allKeys()).toHaveLength(2)
    })

    it('can remove an item from the cache', async () => {
      const key = defaultKey.toKey()
      await cache.set(key, defaultData)

      expect(await cache.get(key)).toStrictEqual(defaultData)
      await cache.remove(key)
      expect(await cache.get(key)).toBeFalsy()
    })
  })
})
