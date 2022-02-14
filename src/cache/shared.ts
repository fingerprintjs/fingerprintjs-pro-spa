import { VisitorData } from '../global'
import { GetOptions } from '@fingerprintjs/fingerprintjs-pro'

export const CACHE_KEY_PREFIX = '@fpjs@client@'
export const MAX_CACHE_LIFE = 60 * 60 * 24 // 24 hours
export const DEFAULT_CACHE_LIFE = 60 * 60 // 1 hour
export const DEFAULT_NOW_PROVIDER = () => Date.now()

export type CacheEntry<TExtended extends boolean = false> = VisitorData<TExtended>

export type Cacheable<TExtended extends boolean = false> = WrappedCacheEntry<TExtended>

export type WrappedCacheEntry<TExtended extends boolean = false> = {
  body: CacheEntry<TExtended>
  expiresAt: number
}

export class CacheKey<TExtended extends boolean> {
  public tag
  public linkedId
  public extendedResult

  constructor(options: GetOptions<TExtended>) {
    this.tag = options.tag || null
    this.linkedId = options.linkedId || null
    this.extendedResult = options.extendedResult ?? false
  }

  /**
   * Converts this `CacheKey` instance into a string for use in a cache
   * @returns A string representation of the key
   */
  toKey(): string {
    return `${JSON.stringify(this.tag)}__${JSON.stringify(this.linkedId)}__${this.extendedResult}`
  }
}

export function getKeyWithPrefix(key: string, prefix: string) {
  return `${prefix}__${key}`
}

export function removePrefixFromKey(key: string, prefix: string) {
  return key.replace(`${prefix}__`, '')
}

export type MaybePromise<T> = Promise<T> | T

export interface ICache {
  set<T = WrappedCacheEntry>(key: string, entry: T): MaybePromise<void>
  get<T = WrappedCacheEntry>(key: string): MaybePromise<T | undefined>
  remove(key: string): MaybePromise<void>
  allKeys(): MaybePromise<string[]>
}
