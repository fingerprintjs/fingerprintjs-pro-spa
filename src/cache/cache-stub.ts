import { ICache } from './shared'

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
