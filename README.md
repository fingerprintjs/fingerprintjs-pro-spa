# @fingerprintjs/fingerprintjs-pro-spa

[![npm](https://img.shields.io/npm/v/@fingerprintjs/fingerprintjs-pro-spa.svg?style=flat)](https://www.npmjs.com/package/@fingerprintjs/fingerprintjs-pro-spa)
[![License](https://img.shields.io/:license-mit-blue.svg?style=flat)](https://opensource.org/licenses/MIT)

This SDK was designed to be used in SPA framework wrappers for the FingerprintJS Pro Javascript Agent. 
It also has several built-in caching mechanism that are optimized according to the official recommendations. 
If just need the [JS agent](https://github.com/fingerprintjs/fingerprintjs), you can use it directly, without this wrapper.

## Table of Contents

- [Documentation](#documentation)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Support + Feedback](#support--feedback)
- [What is FingerprintJS](#what-is-fingerprintjs)
- [License](#license)

## Documentation

- [Documentation](https://dev.fingerprintjs.com/docs)

## Installation

Using [npm](https://npmjs.org):

```sh
npm install @fingerprintjs/fingerprintjs-pro-spa
```

Using [yarn](https://yarnpkg.com):

```sh
yarn add @fingerprintjs/fingerprintjs-pro-spa
```

## Getting Started

### FingerprintJS public API key

In order to identify visitors you'll need a FingerprintJS Pro account (you can [sign up for free](https://dashboard.fingerprintjs.com/signup/)).

- Go to [FingerprintJS Dashboard](https://dashboard.fingerprintjs.com/)
- Open the _API keys_ page from the sidebar
- Find your _Public_ API key

### Creating the client

Create an `FpjsClient` instance before rendering or initializing your application. You should only have one instance of the client.

```js
import { FpjsClient } from '@fingerprintjs/fingerprintjs-pro-spa';

// It can receive mulptiple parameters but the only required one is `loadOptions`, which contains the token
const fpjsClient = new FpjsClient({
  loadOptions: {
    token: "your-fpjs-public-api-key" // insert your public api key from the dashboard here
  }
});
```
You can learn more about different load options here: https://dev.fingerprintjs.com/docs/js-agent#agent-initialization

### 1 - Init the JS agent

Before you start making identification requests to the FingerprintJS Pro API, you need to initialize the Agent 
to allow it to gather browser signals. 
Make sure the initialization has been completed before calling the `getVisitorData` method to avoid errors.

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
The `getVisitorData` method returns visitor identification data based on the request options [https://dev.fingerprintjs.com/docs/js-agent#visitor-identification].
The second parameter `ignoreCache` will make sure that a request to the API  be made even if the data is present in cache.

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

The SDK can be configured to cache the visitor data in memory, in session storage or in local storage. 
The default is in session storage. This setting can be controlled using the `cacheLocation` option when creating the Fpjs client.

To use the session storage mode, no additional options need are required as this is the default setting. To configure the SDK to cache data using local storage, set `cacheLocation` as follows:

```js
const fpjsClient = new FpjsClient({
  loadOptions: {
    token: "your-fpjs-public-api-key"
  },
  cacheLocation: 'localstorage'
});
```

Or if you are using TypeScript:
```ts
const fpjsClient = new FpjsClient({
  loadOptions: {
    token: "your-fpjs-public-api-key"
  },
  cacheLocation: CacheLocation.LocalStorage
});
```

Cache keys are formed based on the combination of the _GetOptions_, so, for example, API responses for calls with `extendedResult: true` and `extendedResult: false`
will be stored independently.

#### Creating a custom cache

The SDK can be configured to use a custom cache store that is implemented by your application. This is useful if you are using this SDK in an environment where a different data storage is more convenient, such as potentially a hybrid mobile app.

To do this, provide an object to the `cache` property of the SDK configuration.

The object should implement the following functions. Note that all of these functions can optionally return a Promise or a static value.

| Signature                        | Return type                    | Description                                                                                                                                                                    |
| -------------------------------- | ------------------------------ |--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `get(key)`                       | Promise<object> or object      | Returns the item from the cache with the specified key, or `undefined` if it was not found                                                                                     |
| `set(key: string, object: any) ` | Promise<void> or void          | Sets an item into the cache                                                                                                                                                    |
| `remove(key)`                    | Promise<void> or void          | Removes a single item from the cache at the specified key, or no-op if the item was not found                                                                                  |
| `allKeys()`                      | Promise<string[]> or string [] | Returns the list of all keys. By default the keys we use are prefixed with `@fpjs@client@` but you can pass your own custom prefix as an option when you create the FpjsClient |

**Note:** The `cache` property takes precedence over the `cacheLocation` property if both are set. A warning is displayed in the console if this scenario occurs.

We also export the internal `InMemoryCache`, `LocalStorageCache`, `SessionStorageCache` and `CacheStub` implementations, so you can wrap your custom cache around these implementations if you wish.

#### Cache time
Fpjs client receives `cacheTimeInSeconds` as one of the options. In order to ensure high identification accuracy we recommend that the visitor data is not cached for longer than 24 hours.
For that reason, if you pass a value higher than 86400 (60 * 60 * 24), the FpjsClient constructor will throw an error.

## Support + Feedback

For support or to provide feedback, please [raise an issue on our issue tracker](https://github.com/fingerprintjs/fingerprintjs-pro-spa/issues).

## What is FingerprintJS?

### FingerprintJS Pro is the fraud detection API for your business

FingerprintJS Pro is a combination of a JavaScript agent that runs in the browser and a server-side storage and API system 
that securely identifies visitors and stores all the information you need to detect fraud.

### JavaScript agent
FingerprintJS Pro does not calculate fingerprints in the browser. Instead, it uses a lightweight JavaScript agent that collects multiple device signals and sends them to our servers. 
This helps prevent reverse engineering and spoofing of an identifier by advanced bots. The agent is hosted at edge locations around the world. It is only 12 KB in size and 20 ms away from your users.

### Server-side identification system
Server-side identification system provides a platform that processes and stores page views and events to identify your website visitors. 
It also provides many helpful features that are explained in more detail on dedicated documentation pages.

Learn more on our [official documentation page](https://dev.fingerprintjs.com/docs/introduction)

## License

This project is licensed under the MIT license. See the [LICENSE](https://github.com/fingerprintjs/fingerprintjs-pro-spa/blob/master/LICENSE) file for more info.
