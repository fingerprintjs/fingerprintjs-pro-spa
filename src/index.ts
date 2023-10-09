export { ICache, Cacheable, LocalStorageCache, SessionStorageCache, InMemoryCache, CacheStub } from './cache'
export * from './client'
export * from './global'

import * as FingerprintJSPro from '@fingerprintjs/fingerprintjs-pro'

/**
 * @deprecated
 *
 * Use `FingerprintJSPro.defaultEndpoint` instead, this export will be removed in the next major version
 * */
const defaultEndpoint = FingerprintJSPro.defaultEndpoint

/**
 * @deprecated
 *
 * Use `FingerprintJSPro.defaultTlsEndpoint` instead, this export will be removed in the next major version
 */
const defaultTlsEndpoint = FingerprintJSPro.defaultTlsEndpoint

/**
 * @deprecated
 *
 * Use `FingerprintJSPro.defaultScriptUrlPattern` instead, this export will be removed in the next major version
 */
const defaultScriptUrlPattern = FingerprintJSPro.defaultScriptUrlPattern

export { defaultEndpoint, defaultTlsEndpoint, defaultScriptUrlPattern }

export { FingerprintJSPro }

/**
 * @deprecated
 *
 * Use `FingerprintJSPro.Agent` instead, this export will be removed in the next major version
 * */
export type Agent = FingerprintJSPro.Agent

/**
 * @deprecated
 *
 * Use `FingerprintJSPro.GetOptions` instead, this export will be removed in the next major version
 */
export type GetOptions<TExtended extends boolean, TIP = unknown> = FingerprintJSPro.GetOptions<TExtended, TIP>

/**
 * @deprecated
 *
 * Use `FingerprintJSPro.GetResult` instead, this export will be removed in the next major version
 */
export type GetResult = FingerprintJSPro.GetResult

/**
 * @deprecated
 *
 * Use `FingerprintJSPro.LoadOptions` instead, this export will be removed in the next major version
 */
export type LoadOptions = FingerprintJSPro.LoadOptions

/**
 * @deprecated
 *
 * Use `FingerprintJSPro.ExtendedGetResult` instead, this export will be removed in the next major version
 */
export type ExtendedGetResult = FingerprintJSPro.ExtendedGetResult
