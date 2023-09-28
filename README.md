<p align="center">
  <a href="https://fingerprint.com">
    <picture>
     <source media="(prefers-color-scheme: dark)" srcset="https://fingerprintjs.github.io/home/resources/logo_light.svg" />
     <source media="(prefers-color-scheme: light)" srcset="https://fingerprintjs.github.io/home/resources/logo_dark.svg" />
     <img src="https://fingerprintjs.github.io/home/resources/logo_dark.svg" alt="Fingerprint logo" width="312px" />
   </picture>
  </a>
<p align="center">
<a href="https://www.npmjs.com/package/@fingerprintjs/fingerprintjs-pro-spa">
  <img src="https://img.shields.io/npm/v/@fingerprintjs/fingerprintjs-pro-spa.svg" alt="Current NPM version">
</a>
<a href="https://fingerprintjs.github.io/fingerprintjs-pro-spa/coverage/">
  <img src="https://fingerprintjs.github.io/fingerprintjs-pro-spa/coverage/badges.svg" alt="coverage">
</a>
<a href="https://www.npmjs.com/package/@fingerprintjs/fingerprintjs-pro-spa">
  <img src="https://img.shields.io/npm/dm/@fingerprintjs/fingerprintjs-pro-spa.svg" alt="Monthly downloads from NPM">
</a>
<a href="https://opensource.org/licenses/MIT">
  <img src="https://img.shields.io/:license-mit-blue.svg" alt="MIT license">
</a>
<a href="https://discord.gg/39EpE2neBg">
  <img src="https://img.shields.io/discord/852099967190433792?style=logo&label=Discord&logo=Discord&logoColor=white" alt="Discord server">
</a>
<a href="https://fingerprintjs.github.io/fingerprintjs-pro-spa">
  <img src="https://img.shields.io/badge/-Documentation-green" alt="Documentation">
</a>


# Fingerprint Pro SPA

[Fingerprint](https://fingerprint.com/) is a device intelligence platform offering 99.5% accurate visitor identification

This library is designed to be used in single-page-application framework wrappers for the Fingerprint Pro JavaScript Agent. 
It has multiple built-in caching mechanisms with recommended default settings. 

If you just need the Fingerprint Pro [JS agent](https://www.npmjs.com/package/@fingerprintjs/fingerprintjs-pro), you can use it directly, without this wrapper. If you're looking for a framework-specific integration, we have dedicated SDKs for [React (including Next, Preact)](https://github.com/fingerprintjs/fingerprintjs-pro-react), [Vue](https://github.com/fingerprintjs/fingerprintjs-pro-vue), [Svelte](https://github.com/fingerprintjs/fingerprintjs-pro-svelte) and [Angular](https://github.com/fingerprintjs/fingerprintjs-pro-angular).

**This SDK works with Fingerprint Pro, it will not work with the open-source FingerprintJS version!** 
Learn more about the [difference between Pro and OSS](https://dev.fingerprint.com/docs/pro-vs-open-source). 
If you'd like to have a similar SPA wrapper for the OSS version of FingerprintJS, consider [raising an issue in our issue tracker](https://github.com/fingerprintjs/fingerprintjs-pro-spa/issues).

## Table of Contents

- [Documentation](#documentation)
- [Installation](#installation)
- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [Support + Feedback](#support--feedback)
- [License](#license)

## Documentation

This library uses [Fingerprint Pro](https://fingerprint.com/github/) under the hood.
- To learn more about Fingerprint Pro read our [product documentation](https://dev.fingerprint.com/docs).
- To learn more about this SDK, there is a [Typedoc-generated SDK Reference](https://fingerprintjs.github.io/fingerprintjs-pro-spa) available.

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

## Requirements

- For TypeScript users: Typescript 4.5 or higher

## Getting Started

### Fingerprint Pro public API key

In order to identify visitors you'll need a Fingerprint Pro account (you can [sign up for free](https://dashboard.fingerprint.com/signup/)).

- Go to [Fingerprint Dashboard](https://dashboard.fingerprint.com/)
- Go to _App settings_ -> _API Keys_.
- Find your _Public_ API key

### Creating the client

Create a `FpjsClient` instance before rendering or initializing your application. You should only have one instance of the client. You need to specify your public API key and other configuration options based on your chosen region and active integration.

```js
import { 
  FpjsClient,
  // defaultEndpoint,
  // defaultScriptUrlPattern
} from '@fingerprintjs/fingerprintjs-pro-spa';

// It can receive multiple parameters but the only required one is `loadOptions`, 
// which contains the public API key
const fpjsClient = new FpjsClient({
  loadOptions: {
    apiKey: "<PUBLIC_API_KEY>",
    // endpoint: ["<CUSTOM_ENDPOINT>", defaultEndpoint],
    // scriptUrlPattern: ["<CUSTOM_SCRIPT_URL>", defaultScriptUrlPattern],
    // region: "eu"
  }
});
```
You can learn more about different load options here in the [JS Agent documentation](https://dev.fingerprint.com/docs/js-agent#initializing-the-agent).

### 1 - Init the JS agent

Before you start making identification requests to the Fingerprint Pro API, you need to initialize the JS Agent to allow it to gather browser signals.  Make sure the initialization has been completed before calling the `getVisitorData` method to avoid errors.

```js
// with async/await
await fpjsClient.init()
const visitorData = await fpjsClient.getVisitorData()

// with promises
const visitorData = fpjsClient.init().then(() => {
  return fpjsClient.getVisitorData()
})
```

### 2 - Calling an API
The `getVisitorData` method returns visitor identification data based on the request [options](https://dev.fingerprint.com/docs/js-agent#visitor-identification).
Set `ignoreCache` to `true` to make a request to the API even if the data is present in the cache.

```js
// with async/await
const visitorData = await fpjsClient.getVisitorData({ extendedResult: true })

// with promises
const visitorData = fpjsClient.getVisitorData({ extendedResult: true }).then((visitorData) => {
  // use visitor data in your fraud prevention logic
  checkIfFingerprintIsFraudulent(visitorData.visitorId) // this method is just an example, this SDK doesn't actually supply it
})
```

### Caching

The SDK can cache the visitor data in session storage (default), in local storage, or in memory. 
You can specify the `cacheLocation` option when creating the Fpjs client.

```js
const fpjsClient = new FpjsClient({
  loadOptions: {
    apiKey: "your-fpjs-public-api-key"
  },
  cacheLocation: 'localstorage'
});
```

Or if you are using TypeScript:
```ts
const fpjsClient = new FpjsClient({
  loadOptions: {
    apiKey: "your-fpjs-public-api-key"
  },
  cacheLocation: CacheLocation.LocalStorage
});
```

Cache keys are based on the combination of _GetOptions_. For example, API responses for calls with `extendedResult: true` and `extendedResult: false` are stored independently.

#### Creating a custom cache

The SDK can use a custom cache store implemented inside your application. This is useful when a different data store is more convenient in your environment, such as a hybrid mobile app.

You can provide an object to the `cache` property of the SDK configuration that implements the following functions. All the functions can return a Promise or a static value.

| Signature                        | Return type                    | Description                                                                                                                                                                    |
| -------------------------------- | ------------------------------ |--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `get(key)`                       | Promise<object> or object      | Returns the item from the cache with the specified key, or `undefined` if it was not found                                                                                     |
| `set(key: string, object: any) ` | Promise<void> or void          | Sets an item into the cache                                                                                                                                                    |
| `remove(key)`                    | Promise<void> or void          | Removes a single item from the cache at the specified key, or no-op if the item was not found                                                                                  |
| `allKeys()`                      | Promise<string[]> or string [] | Returns the list of all keys. By default, the keys we use are prefixed with `@fpjs@client@` but you can pass your own custom prefix as an option when you create the FpjsClient |

**Note:** The `cache` property takes priority over `cacheLocation` if both are set. A warning is displayed in the console if that happens.

We export the internal `InMemoryCache`, `LocalStorageCache`, `SessionStorageCache`, and `CacheStub` implementations, so you can wrap your custom cache around these implementations if you wish.

#### Cache time
Use the `cacheTimeInSeconds` client constructor option to set a custom cache time. To ensure high identification accuracy we recommend not to cache visitors data for longer than 24 hours. If you pass a value higher than 86400 (60 * 60 * 24), the `FpjsClient` constructor will throw an error.

## Support + Feedback

For support or to provide feedback, please use [Issues](https://github.com/fingerprintjs/fingerprintjs-pro-spa/issues).

## License

This project is licensed under the MIT license. See the [LICENSE](https://github.com/fingerprintjs/fingerprintjs-pro-spa/blob/master/LICENSE) file for more information.
