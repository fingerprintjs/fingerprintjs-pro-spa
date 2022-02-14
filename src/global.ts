import * as FingerprintJS from '@fingerprintjs/fingerprintjs-pro'
import { ICache } from './cache'

export type VisitorData<TExtended extends boolean = false> = TExtended extends false
  ? FingerprintJS.GetResult
  : FingerprintJS.ExtendedGetResult

export enum CacheLocation {
  Memory = 'memory',
  LocalStorage = 'localstorage',
  SessionStorage = 'sessionstorage',
  NoCache = 'nocache',
}

export interface FpjsClientOptions {
  /**
   * Options for the FingerprintJS JS Agent load() method.
   */
  loadOptions: FingerprintJS.LoadOptions

  /**
   * Defines which built-in cache mechanism the client should use.
   */
  cacheLocation?: CacheLocation

  /**
   * Custom cache implementation. Takes precedence over the `cacheLocation` property.
   */
  cache?: ICache

  /**
   * Duration in seconds for which data is stored in cache. Cannot exceed 86_400 (24h) because caching data
   * for longer than 24 hours can negatively affect identification accuracy.
   */
  cacheTimeInSeconds?: number

  /**
   * Custom prefix for localStorage and sessionStorage cache keys. Will be ignored if `cache` is provided.
   */
  cachePrefix?: string
}
