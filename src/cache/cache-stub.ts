import { ICache } from './shared'

/**
 * Implementation of stub cache that is used when cache is disabled by user
 * */
export class CacheStub implements ICache {
  set() {}

  get() {
    return undefined
  }

  remove() {}

  allKeys() {
    return []
  }
}
