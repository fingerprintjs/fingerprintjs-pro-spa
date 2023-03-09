import * as FingerprintJS from '@fingerprintjs/fingerprintjs-pro'
import { CacheLocation, FpjsClient, ICache } from '../src'
import { CacheKey, getKeyWithPrefix, MAX_CACHE_LIFE } from '../src/cache'
import * as packageInfo from '../package.json'

const getDefaultLoadOptions = () => ({
  apiKey: 'test_api_key',
})

const cacheMock: ICache = {
  set: jest.fn(),
  get: jest.fn(),
  remove: jest.fn(),
  allKeys: jest.fn().mockImplementation(() => ['key1', 'key2']),
}

describe(`SPA client`, () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should throw error if cacheTime exceed the highest allowed value', function () {
    expect(
      () => new FpjsClient({ loadOptions: getDefaultLoadOptions(), cacheTimeInSeconds: MAX_CACHE_LIFE + 1 })
    ).toThrow('Cache time cannot exceed 86400 seconds (24 hours)')
  })

  describe(`setup`, () => {
    const agentGetMock = jest.fn()

    let loadSpy: jest.SpyInstance<ReturnType<typeof FingerprintJS['load']>>

    beforeEach(() => {
      loadSpy = jest.spyOn(FingerprintJS, 'load')

      loadSpy.mockImplementation(async () => {
        return {
          get: agentGetMock,
        }
      })
    })

    it(`shouldn't call FingerprintJS.load() if initialization is called more than once`, async () => {
      const client = new FpjsClient({ loadOptions: getDefaultLoadOptions() })

      // first call
      await client.init()
      // second call
      await client.init()

      expect(FingerprintJS.load).toHaveBeenCalledTimes(1)
    })

    it(`should throw if getVisitorData is called before client initialization`, async () => {
      const client = new FpjsClient({ loadOptions: getDefaultLoadOptions() })

      await expect(() => client.getVisitorData()).rejects.toThrow(
        "FPJSAgent hasn't loaded yet. Make sure to call the init() method first."
      )
    })

    it('should allow calling .init() again in case of errors thrown by agent', async () => {
      const client = new FpjsClient({ loadOptions: getDefaultLoadOptions() })

      loadSpy.mockClear()
      loadSpy.mockRejectedValueOnce(new Error('Network error'))

      await expect(client.init()).rejects.toThrow()

      loadSpy.mockImplementation(async () => {
        return {
          get: agentGetMock,
        }
      })

      await expect(client.init()).resolves.not.toThrow()
    })

    it('should use `cache` in case if `cache` and `cacheLocation` both passed', async () => {
      const client = new FpjsClient({
        loadOptions: getDefaultLoadOptions(),
        cacheLocation: CacheLocation.LocalStorage,
        cache: cacheMock,
      })

      loadSpy.mockClear()
      await client.init()

      await client.getVisitorData()
      expect(cacheMock.get).toBeCalledTimes(1)
      expect(cacheMock.set).toBeCalledTimes(1)
    })

    it('should throw error in case of wrong cacheLocation', async () => {
      expect(
        () =>
          new FpjsClient({
            loadOptions: getDefaultLoadOptions(),
            // @ts-ignore
            cacheLocation: 'WrongCacheLocation',
          })
      ).toThrow('Invalid cache location "WrongCacheLocation"')
    })

    it('clearCache should call allKeys and remove methods', async () => {
      const client = new FpjsClient({
        loadOptions: getDefaultLoadOptions(),
        cache: cacheMock,
      })

      await client.clearCache()

      expect(cacheMock.allKeys).toBeCalledTimes(1)
      expect(cacheMock.remove).toBeCalledTimes(2)
    })
  })

  describe('getVisitorData', () => {
    const mockVisitorId = 'abc123'
    const cachePrefix = 'cache_test'
    let agentGetMock: jest.Mock

    beforeEach(() => {
      agentGetMock = jest.fn(async () => {
        return {
          visitorId: mockVisitorId,
        } as FingerprintJS.GetResult
      })
      // @ts-ignore
      jest.spyOn(FingerprintJS, 'load').mockImplementation(async () => {
        return {
          get: agentGetMock,
        }
      })
    })

    afterEach(() => {
      localStorage.clear()
    })

    it(`shouldn't call agent.get() a second time if there is an in-flight request already`, async () => {
      const client = new FpjsClient({
        loadOptions: getDefaultLoadOptions(),
      })
      await client.init()

      const getCall1 = client.getVisitorData()
      const getCall2 = client.getVisitorData()

      const result1 = await getCall1
      const result2 = await getCall2

      expect(agentGetMock).toHaveBeenCalledTimes(1)
      expect(result1?.visitorId).toBe(mockVisitorId)
      expect(result2?.visitorId).toBe(mockVisitorId)
    })

    it('should remove in-flight request even if it throws', async () => {
      agentGetMock.mockReset().mockRejectedValue(new Error())

      const client = new FpjsClient({
        loadOptions: getDefaultLoadOptions(),
      })
      await client.init()

      await expect(client.getVisitorData({}, true)).rejects.toThrow()

      agentGetMock.mockResolvedValue({
        visitorId: mockVisitorId,
      })

      await expect(client.getVisitorData({}, true)).resolves.toEqual({
        visitorId: mockVisitorId,
      })

      expect(agentGetMock).toHaveBeenCalledTimes(2)
    })

    it(`should get cached data if there is an in-flight request already`, async () => {
      const client = new FpjsClient({
        loadOptions: getDefaultLoadOptions(),
        cacheLocation: CacheLocation.LocalStorage,
        cachePrefix,
      })
      const options = { extendedResult: true }
      const cacheKey = new CacheKey(options)
      const key = getKeyWithPrefix(cacheKey.toKey(), cachePrefix)
      const cacheEntry = {
        body: { visitorId: mockVisitorId },
        expiresAt: Math.floor(Date.now() / 1000) + 60,
      }
      localStorage.setItem(key, JSON.stringify(cacheEntry))

      await client.init()

      const getCall1 = client.getVisitorData(options)
      const getCall2 = client.getVisitorData(options)

      const result1 = await getCall1
      const result2 = await getCall2

      expect(agentGetMock).toHaveBeenCalledTimes(0)
      expect(result1?.visitorId).toBe(mockVisitorId)
      expect(result2?.visitorId).toBe(mockVisitorId)
    })

    it(`shouldn't get cached data if there is an in-flight request already if options are different`, async () => {
      const client = new FpjsClient({
        loadOptions: getDefaultLoadOptions(),
        cacheLocation: CacheLocation.LocalStorage,
        cachePrefix,
      })
      const options = { extendedResult: false }
      const cacheKey = new CacheKey(options)
      const key = getKeyWithPrefix(cacheKey.toKey(), cachePrefix)
      const cacheEntry = {
        body: { visitorId: mockVisitorId },
        expiresAt: Math.floor(Date.now() / 1000) + 60,
      }
      localStorage.setItem(key, JSON.stringify(cacheEntry))

      await client.init()

      const getCall1 = client.getVisitorData(options)
      const getCall2 = client.getVisitorData({ extendedResult: true })

      const result1 = await getCall1
      const result2 = await getCall2

      expect(agentGetMock).toHaveBeenCalledTimes(1)
      expect(result1?.visitorId).toBe(mockVisitorId)
      expect(result2?.visitorId).toBe(mockVisitorId)
    })

    it(`shouldn't get cached data if a flag to ignore cache is set to true`, async () => {
      const client = new FpjsClient({
        loadOptions: getDefaultLoadOptions(),
        cacheLocation: CacheLocation.LocalStorage,
        cachePrefix,
      })
      const options = { extendedResult: true }
      const cacheKey = new CacheKey(options)
      const key = getKeyWithPrefix(cacheKey.toKey(), cachePrefix)
      const cacheEntry = {
        body: { visitorId: mockVisitorId },
        expiresAt: Math.floor(Date.now() / 1000) + 60,
      }
      localStorage.setItem(key, JSON.stringify(cacheEntry))

      await client.init()

      const result = await client.getVisitorData(options, true)

      expect(agentGetMock).toHaveBeenCalledTimes(1)
      expect(result?.visitorId).toBe(mockVisitorId)
    })
  })

  describe('add integrationInfo', () => {
    const agentGetMock = jest.fn()

    beforeEach(() => {
      jest.spyOn(FingerprintJS, 'load').mockImplementation(async () => {
        return {
          get: agentGetMock,
        }
      })
    })

    it('when field empty', async () => {
      const client = new FpjsClient({ loadOptions: getDefaultLoadOptions() })
      await client.init()
      expect(FingerprintJS.load).toBeCalledWith({
        ...getDefaultLoadOptions(),
        integrationInfo: [`fingerprintjs-pro-spa/${packageInfo.version}`],
      })
    })

    it('when field contains other integration info', async () => {
      const client = new FpjsClient({
        loadOptions: {
          ...getDefaultLoadOptions(),
          integrationInfo: ['fingerprintjs-pro-react/0.0.1'],
        },
      })
      await client.init()
      expect(FingerprintJS.load).toBeCalledWith({
        ...getDefaultLoadOptions(),
        integrationInfo: ['fingerprintjs-pro-react/0.0.1', `fingerprintjs-pro-spa/${packageInfo.version}`],
      })
    })
  })
})
