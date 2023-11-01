import * as FingerprintJS from '@fingerprintjs/fingerprintjs-pro'
import { GetOptions, LoadOptions } from '@fingerprintjs/fingerprintjs-pro'
import {
  CacheKey,
  CacheManager,
  CacheStub,
  DEFAULT_CACHE_LIFE,
  ICache,
  InMemoryCache,
  LocalStorageCache,
  MAX_CACHE_LIFE,
  SessionStorageCache,
} from './cache'
import { CacheLocation, FpjsClientOptions, VisitorData } from './global'
import * as packageInfo from '../package.json'

const cacheLocationBuilders: Record<CacheLocation, (prefix?: string) => ICache> = {
  [CacheLocation.Memory]: () => new InMemoryCache().enclosedCache,
  [CacheLocation.LocalStorage]: (prefix) => new LocalStorageCache(prefix),
  [CacheLocation.SessionStorage]: (prefix) => new SessionStorageCache(prefix),
  [CacheLocation.NoCache]: () => new CacheStub(),
}

const doesBrowserSupportCacheLocation = (cacheLocation: CacheLocation) => {
  switch (cacheLocation) {
    case CacheLocation.SessionStorage:
      try {
        window.sessionStorage.getItem('item')
      } catch (e) {
        return false
      }
      return true
    case CacheLocation.LocalStorage:
      try {
        window.localStorage.getItem('item')
      } catch (e) {
        return false
      }
      return true
    default:
      return true
  }
}

const cacheFactory = (location: CacheLocation) => {
  return cacheLocationBuilders[location]
}

export interface CustomAgent {
  load: (options: FingerprintJS.LoadOptions) => Promise<FingerprintJS.Agent>
}

export interface FpjsSpaOptions
  extends Omit<FpjsClientOptions, 'loadOptions'>,
    Pick<Partial<FpjsClientOptions>, 'loadOptions'> {
  customAgent?: CustomAgent
}

/**
 * FingerprintJS SDK for Single Page Applications
 */
export class FpjsClient {
  private cacheManager: CacheManager
  private readonly loadOptions?: FingerprintJS.LoadOptions
  private agent: FingerprintJS.Agent
  private agentPromise: Promise<FingerprintJS.Agent> | null
  private readonly customAgent?: CustomAgent
  readonly cacheLocation?: CacheLocation

  private inFlightRequests = new Map<string, Promise<VisitorData>>()

  constructor(options?: FpjsSpaOptions) {
    this.agentPromise = null
    this.customAgent = options?.customAgent

    this.agent = {
      get: () => {
        throw new Error("FPJSAgent hasn't loaded yet. Make sure to call the init() method first.")
      },
    }

    this.loadOptions = options?.loadOptions

    if (options?.cache && options?.cacheLocation) {
      console.warn(
        'Both `cache` and `cacheLocation` options have been specified in the FpjsClient configuration; ignoring `cacheLocation` and using `cache`.'
      )
    }

    let cache: ICache

    if (options?.cache) {
      cache = options.cache
    } else {
      this.cacheLocation = options?.cacheLocation || CacheLocation.SessionStorage

      if (!cacheFactory(this.cacheLocation)) {
        throw new Error(`Invalid cache location "${this.cacheLocation}"`)
      }
      if (!doesBrowserSupportCacheLocation(this.cacheLocation)) {
        this.cacheLocation = CacheLocation.Memory
      }

      cache = cacheFactory(this.cacheLocation)(options?.cachePrefix)
    }

    if (options?.cacheTimeInSeconds && options.cacheTimeInSeconds > MAX_CACHE_LIFE) {
      throw new Error(`Cache time cannot exceed 86400 seconds (24 hours)`)
    }

    const cacheTime = options?.cacheTimeInSeconds ?? DEFAULT_CACHE_LIFE
    this.cacheManager = new CacheManager(cache, cacheTime)
  }

  /**
   * Loads FPJS JS agent with certain settings and stores the instance in memory
   * [https://dev.fingerprint.com/docs/js-agent#agent-initialization]
   *
   * @param passedLoadOptions Additional load options to be passed to the agent, they will be merged with load options provided in the constructor.
   */
  public async init(passedLoadOptions?: Partial<LoadOptions>) {
    if (!this.loadOptions && !passedLoadOptions) {
      throw new TypeError('No load options provided')
    }

    const loadOptions: FingerprintJS.LoadOptions = {
      ...this.loadOptions!,
      ...passedLoadOptions!,
      integrationInfo: [
        ...(this.loadOptions?.integrationInfo || []),
        ...(passedLoadOptions?.integrationInfo || []),
        `fingerprintjs-pro-spa/${packageInfo.version}`,
      ],
    }

    if (!this.agentPromise) {
      const agentLoader = this.customAgent ?? FingerprintJS
      this.agentPromise = agentLoader
        .load(loadOptions)
        .then((agent) => {
          this.agent = agent
          return agent
        })
        .catch((error) => {
          this.agentPromise = null

          throw error
        })
    }

    return this.agentPromise
  }

  /**
   * Returns visitor identification data based on the request options
   * [https://dev.fingerprint.com/docs/js-agent#visitor-identification]
   *
   * @param options
   * @param ignoreCache if set to true a request to the API will be made even if the data is present in cache
   */
  public async getVisitorData<TExtended extends boolean>(options: GetOptions<TExtended> = {}, ignoreCache = false) {
    const cacheKey = FpjsClient.makeCacheKey(options)
    const key = cacheKey.toKey()

    if (!this.inFlightRequests.has(key)) {
      const promise = this._identify(options, ignoreCache).finally(() => {
        this.inFlightRequests.delete(key)
      })
      this.inFlightRequests.set(key, promise)
    }

    return (await this.inFlightRequests.get(key)) as VisitorData<TExtended>
  }

  /**
   * Clears visitor data from cache regardless of the cache implementation
   */
  public async clearCache() {
    await this.cacheManager.clearCache()
  }

  /**
   * Makes a CacheKey object from GetOptions
   */
  static makeCacheKey<TExtended extends boolean>(options: GetOptions<TExtended>) {
    return new CacheKey<TExtended>(options)
  }

  private async _identify<TExtended extends boolean>(options: GetOptions<TExtended>, ignoreCache = false) {
    const key = FpjsClient.makeCacheKey(options)

    if (!ignoreCache) {
      const cacheResult = await this.cacheManager.get(key)

      if (cacheResult) {
        return cacheResult
      }
    }

    const agentResult = await this.agent.get(options)
    await this.cacheManager.set(key, agentResult)
    return agentResult
  }
}
