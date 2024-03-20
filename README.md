<p align="center">
  <a href="https://fingerprint.com">
    <picture>
     <source media="(prefers-color-scheme: dark)" srcset="https://fingerprintjs.github.io/home/resources/logo_light.svg" />
     <source media="(prefers-color-scheme: light)" srcset="https://fingerprintjs.github.io/home/resources/logo_dark.svg" />
     <img src="https://fingerprintjs.github.io/home/resources/logo_dark.svg" alt="Fingerprint logo" width="312px" />
   </picture>
  </a>
</p>
<p align="center">
<a href="https://www.npmjs.com/package/@fingerprintjs/fingerprintjs-pro-spa" style="text-decoration: none;"><img src="https://img.shields.io/npm/v/@fingerprintjs/fingerprintjs-pro-spa.svg" alt="Current NPM version"></a>
<a href="https://fingerprintjs.github.io/fingerprintjs-pro-spa/coverage/" style="text-decoration: none;"><img src="https://fingerprintjs.github.io/fingerprintjs-pro-spa/coverage/badges.svg" alt="coverage"></a>
<a href="https://www.npmjs.com/package/@fingerprintjs/fingerprintjs-pro-spa"><img src="https://img.shields.io/npm/dm/@fingerprintjs/fingerprintjs-pro-spa.svg" alt="Monthly downloads from NPM"></a>
<a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/:license-mit-blue.svg" alt="MIT license"></a>
<a href="https://discord.gg/39EpE2neBg"><img src="https://img.shields.io/discord/852099967190433792?style=logo&label=Discord&logo=Discord&logoColor=white" alt="Discord server"></a>
<a href="https://fingerprintjs.github.io/fingerprintjs-pro-spa"><img src="https://img.shields.io/badge/-Documentation-green" alt="Documentation"></a>
</p>

# Fingerprint Pro SPA

[Fingerprint](https://fingerprint.com/) is a device intelligence platform offering 99.5% accurate visitor identification

This library is a framework-agnostic wrapper around the Fingerprint Pro [JavaScript Agent](https://www.npmjs.com/package/@fingerprintjs/fingerprintjs-pro), adding multiple built-in caching mechanisms with recommended default settings.

- If you just need the Fingerprint Pro [JS agent](https://www.npmjs.com/package/@fingerprintjs/fingerprintjs-pro) without caching, you can use it directly.
- If you're looking for a framework-specific integration, we have dedicated SDKs for [React (including Next, Preact)](https://github.com/fingerprintjs/fingerprintjs-pro-react), [Vue](https://github.com/fingerprintjs/fingerprintjs-pro-vue), [Svelte](https://github.com/fingerprintjs/fingerprintjs-pro-svelte) and [Angular](https://github.com/fingerprintjs/fingerprintjs-pro-angular).
- If you have a single-page web application that needs caching, but also more low-level control over the agent than framework-specific SDKs provide, this library is for you.

> [!NOTE]
> This library assumes you have a Fingerprint Pro subscription or trial, it is not compatible with the [source-available FingerprintJS](https://github.com/fingerprintjs/fingerprintjs). See our documentation to learn more about the [differences between Fingerprint Pro and FingerprintJS](https://dev.fingerprint.com/docs/identification-vs-fingerprintjs).

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Caching](#caching)
- [Support and Feedback](#support-and-feedback)
- [Documentation](#documentation)
- [License](#license)

## Requirements

- For TypeScript users: Typescript 4.5 or higher

## Installation

Using [npm](https://npmjs.org):

```sh
npm install @fingerprintjs/fingerprintjs-pro-spa
```

Using [yarn](https://yarnpkg.com):

```sh
yarn add @fingerprintjs/fingerprintjs-pro-spa
```

Using [pnpm](https://pnpm.js.org):

```sh
pnpm add @fingerprintjs/fingerprintjs-pro-spa
```

## Getting Started

### 1. Get your Fingerprint Pro Public API key

In order to identify visitors you'll need a Fingerprint Pro account (you can [sign up for free](https://dashboard.fingerprint.com/signup/)).

- Go to **Fingerprint Dashboard** > **App settings** > [**API Keys**](https://dashboard.fingerprint.com/api-keys).
- Find your Public API key.

### 2. Create the client

Create a `FpjsClient` instance before rendering or initializing your application. You should only have one instance of the client. You need to specify your public API key and other configuration options based on your chosen region and active integration.

```js
import { FpjsClient, FingerprintJSPro } from '@fingerprintjs/fingerprintjs-pro-spa'

const fpjsClient = new FpjsClient({
  // You can also pass these options later in `.init()` method
  loadOptions: {
    apiKey: '<PUBLIC_API_KEY>',
    // endpoint: ["<CUSTOM_ENDPOINT>", FingerprintJSPro.defaultEndpoint],
    // scriptUrlPattern: ["<CUSTOM_SCRIPT_URL>", FingerprintJSPro.defaultScriptUrlPattern],
    // region: "eu"
  },
})
```

> [!NOTE]
> You must provide `loadOptions` containing your public API key either in the constructor or in the `init` method. If you don't, the SDK will throw an error. You can learn more about different load options here in the [JS Agent documentation](https://dev.fingerprint.com/docs/js-agent#initializing-the-agent).

### 3. Initialize the JS Agent

Before you start making identification requests to the Fingerprint Pro API, you need to initialize the JS Agent. This downloads the latest client-side logic from Fingerprint CDN. Call `init()` before the `getVisitorData()` method to avoid errors.

```js
// with async/await
await fpjsClient.init()

const visitorData = await fpjsClient.getVisitorData()

// with promises
const visitorData = fpjsClient.init().then(() => {
  return fpjsClient.getVisitorData()
})
```

You can also pass the `loadOptions` into the `init` method here. They will be merged with the options passed to the constructor.

```js
await fpjsClient.init({
  apiKey: '<PUBLIC_API_KEY>',
  // endpoint: ["<CUSTOM_ENDPOINT>", FingerprintJSPro.defaultEndpoint],
  // scriptUrlPattern: ["<CUSTOM_SCRIPT_URL>", FingerprintJSPro.defaultScriptUrlPattern],
  // region: "eu"
})
```

### 4. Identify visitors

The `getVisitorData` method returns visitor identification data based on the request [options](https://dev.fingerprint.com/docs/js-agent#get-options).
Set `ignoreCache` to `true` to call the API even if the data is present in the cache.

```js
// with async/await
const visitorData = await fpjsClient.getVisitorData({ extendedResult: true, ignoreCache: false })

// with promises
const visitorData = fpjsClient.getVisitorData({ extendedResult: true }).then((visitorData) => {
  // use visitor data in your fraud prevention logic
  checkIfFingerprintIsFraudulent(visitorData.visitorId) // this method is just an example, this SDK doesn't actually supply it
})
```

See the [JS Agent API reference](https://dev.fingerprint.com/docs/js-agent) for more details.

#### Linking and tagging information

The `visitorId` provided by Fingerprint Identification is especially useful when combined with information you already know about your users, for example, account IDs, order IDs, etc. To learn more about various applications of the `linkedId` and `tag`, see [Linking and tagging information](https://dev.fingerprint.com/docs/tagging-information).

```js
const visitorData = await fpjsClient.getVisitorData({
  linkedId: 'user_1234',
  tag: {
    userAction: 'login',
    analyticsId: 'UA-5555-1111-1',
  },
})
```

## Caching

Fingerprint Pro usage is billed per API call. To avoid unnecessary API calls, it is a good practice to cache identification results. The SDK provides three ways to cache visitor data out of the box:

- Session storage (default) - `sessionStorage`
- Local storage - `localStorage`
- Memory - `memory`
- No cache - `nocache`

You can specify the `cacheLocation` option when creating the `FpjsClient`:

```js
const fpjsClient = new FpjsClient({
  loadOptions: {
    apiKey: 'your-fpjs-public-api-key',
  },
  cacheLocation: 'localstorage',
  // You can also use the provided TypeScript enum
  // cacheLocation: CacheLocation.LocalStorage
})
```

Cache keys are based on the combination of _GetOptions_. For example, API responses for calls with `extendedResult: true` and `extendedResult: false` are stored independently.

> [!NOTE]
> If you use data from [`extendedResult`](https://dev.fingerprint.com/docs/js-agent#extendedresult), pay additional attention to your caching strategy. Some fields, for example, `ip` or `lastSeenAt`, might change over time for the same visitor.

You can ignore the cached result for a specific API call and using `{ ignoreCache: true }`:

```js
const visitorData = await fpjsClient.getVisitorData({ ignoreCache: true })
```

Check if your response was retrieved from cache using the returned `cacheHit` flag:

```js
const { cacheHit, ...visitorData } = await fpjsClient.getVisitorData()
```

Use `getVisitorDataFromCache` to directly retrieve responses from cache:

```js
// Checks if request matching given options is present in cache
await fpjsClient.isInCache({ extendedResult: true })

// Returns cached visitor data based on the request options, or undefined if the data is not present in cache
const cachedResult = await fpjsClient.getVisitorDataFromCache({ extendedResult: true })
```

You can also use your custom cache implementation as described below.

### Creating a custom cache

The SDK can use a custom cache store implemented inside your application. This is useful when a different data store is more convenient in your environment, such as a hybrid mobile app.

You can provide an object to the `cache` property of the SDK configuration that implements the following functions. All the functions can return a Promise or a static value.

| Signature                        | Return type                    | Description                                                                                                                                                                     |
| -------------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `get(key)`                       | Promise<object> or object      | Returns the item from the cache with the specified key, or `undefined` if it was not found                                                                                      |
| `set(key: string, object: any) ` | Promise<void> or void          | Sets an item into the cache                                                                                                                                                     |
| `remove(key)`                    | Promise<void> or void          | Removes a single item from the cache at the specified key, or no-op if the item was not found                                                                                   |
| `allKeys()`                      | Promise<string[]> or string [] | Returns the list of all keys. By default, the keys we use are prefixed with `@fpjs@client@` but you can pass your own custom prefix as an option when you create the FpjsClient |

> [!NOTE]
> The `cache` property takes priority over `cacheLocation` if both are set. A warning is displayed in the console if that happens.

We export the internal `InMemoryCache`, `LocalStorageCache`, `SessionStorageCache`, and `CacheStub` implementations, so you can wrap your custom cache around these implementations if you wish.

### Cache time

Use the `cacheTimeInSeconds` client constructor option to set a custom cache time. To ensure high identification accuracy we recommend not to cache visitors data for longer than 24 hours. If you pass a value higher than 86400 (60 x 60 x 24), the `FpjsClient` constructor will throw an error.

## Support and feedback

To report problems, ask questions, or provide feedback, please use [Issues](https://github.com/fingerprintjs/fingerprintjs-pro-spa/issues). If you need private support, you can email us at [oss-support@fingerprint.com](mailto:oss-support@fingerprint.com).

## Documentation

This library uses [Fingerprint Pro](https://fingerprint.com/github/) under the hood.

- To learn more about Fingerprint Pro read our [product documentation](https://dev.fingerprint.com/docs).
- To learn more about this SDK, there is a [Typedoc-generated SDK Reference](https://fingerprintjs.github.io/fingerprintjs-pro-spa) available.

## License

This project is licensed under the MIT license. See the [LICENSE](https://github.com/fingerprintjs/fingerprintjs-pro-spa/blob/master/LICENSE) file for more information.
