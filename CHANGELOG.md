## [1.2.0](https://github.com/fingerprintjs/fingerprintjs-pro-spa/compare/v1.1.3...v1.2.0) (2023-10-10)


### Features

* export `fingerprintjs-pro` as `FingerprintJSPro`, deprecate other exports from this library ([735e302](https://github.com/fingerprintjs/fingerprintjs-pro-spa/commit/735e302f0280950122de8ab8983828e35db676a2))

## [1.1.3](https://github.com/fingerprintjs/fingerprintjs-pro-spa/compare/v1.1.2...v1.1.3) (2023-09-19)


### Bug Fixes

* introduce FpjsSpaOptions type ([9312a62](https://github.com/fingerprintjs/fingerprintjs-pro-spa/commit/9312a62b8b6ec29adf830c3b1658f45caece940b))

## [1.1.2](https://github.com/fingerprintjs/fingerprintjs-pro-spa/compare/v1.1.1...v1.1.2) (2023-09-12)


### Bug Fixes

* bump js agent loader version ([addee9e](https://github.com/fingerprintjs/fingerprintjs-pro-spa/commit/addee9ee7122128678d78f9de0e63e24982ad042))

## [1.1.1](https://github.com/fingerprintjs/fingerprintjs-pro-spa/compare/v1.1.0...v1.1.1) (2023-09-12)


### Bug Fixes

* we can pass custom JS Agent to the SPA package now ([24cc153](https://github.com/fingerprintjs/fingerprintjs-pro-spa/commit/24cc153a8ce102cdc14eed259f839d6b57f64963))


### Documentation

* **README:** add fallback endpoints and polish readme ([1bd0cbf](https://github.com/fingerprintjs/fingerprintjs-pro-spa/commit/1bd0cbf6c16a64fd778bc802c5c3536c2a627312))

## [1.1.0](https://github.com/fingerprintjs/fingerprintjs-pro-spa/compare/v1.0.2...v1.1.0) (2023-07-05)


### Features

* add reexports for `defaultEndpoint`, `defaultTlsEndpoint`, `defaultScriptUrlPattern` ([91dafd0](https://github.com/fingerprintjs/fingerprintjs-pro-spa/commit/91dafd07c66281f64bab715a956730ecbb307f45))


### Bug Fixes

* update JS Agent with fixed `subdivisions` type ([6cd5fca](https://github.com/fingerprintjs/fingerprintjs-pro-spa/commit/6cd5fcad002339ca537e926d4686d50826237cb3))

## [1.0.2](https://github.com/fingerprintjs/fingerprintjs-pro-spa/compare/v1.0.1...v1.0.2) (2023-04-14)


### Bug Fixes

* fix release pipeline to have a correct version in `integrationInfo` ([215f713](https://github.com/fingerprintjs/fingerprintjs-pro-spa/commit/215f713ae34e754fc8d7da917235e2f1463ea044))

## [1.0.1](https://github.com/fingerprintjs/fingerprintjs-pro-spa/compare/v1.0.0...v1.0.1) (2023-04-11)


### Bug Fixes

* if `sessionStorage` or `localStorage` isn't supported in browser, use `Memory` cache location ([1b702f6](https://github.com/fingerprintjs/fingerprintjs-pro-spa/commit/1b702f641c5bcf5a10ae1fb0048e4e63f4beac32))

## [1.0.0](https://github.com/fingerprintjs/fingerprintjs-pro-spa/compare/v0.7.0...v1.0.0) (2023-03-10)


### ⚠ BREAKING CHANGES

* first major release

### Documentation

* **README:** add logo and relevant badges, title ([52f1b6d](https://github.com/fingerprintjs/fingerprintjs-pro-spa/commit/52f1b6d7dd04464bb95c5099759235ae2cfeaa3f))
* **README:** polish, link to all client SDKs ([11d7820](https://github.com/fingerprintjs/fingerprintjs-pro-spa/commit/11d78203c88a06054d9ffd63935ab7f2e4c76073))
* **README:** update logo image source ([6e1d51c](https://github.com/fingerprintjs/fingerprintjs-pro-spa/commit/6e1d51c0cb25b98b5b0ad53528a17440cce96c21))


### Tests

* check custom `cache` object, check `clearCache` method ([c0605ad](https://github.com/fingerprintjs/fingerprintjs-pro-spa/commit/c0605add0559bb7e975e8e770d7bebf39968a2b3))

## [0.7.0](https://github.com/fingerprintjs/fingerprintjs-pro-spa/compare/v0.6.0...v0.7.0) (2022-11-16)


### Features

* update agent to 3.8.1 ([c429c95](https://github.com/fingerprintjs/fingerprintjs-pro-spa/commit/c429c956d2ed6f3f236fc6f3d7789b93c50a757f))


### Bug Fixes

* allow calling .init() multiple times in case if agent loading fails ([80e8af0](https://github.com/fingerprintjs/fingerprintjs-pro-spa/commit/80e8af0c28da993bfd1d37e23ff3f9200375d33b))

## [0.6.0](https://github.com/fingerprintjs/fingerprintjs-pro-spa/compare/v0.5.0...v0.6.0) (2022-11-10)


### Features

* bump JS Agent to 3.8.0 ([ac7e26b](https://github.com/fingerprintjs/fingerprintjs-pro-spa/commit/ac7e26b7ceb4bc924e12dba6bfc0b0d8113a4166))


### Documentation

* **README:** add documentation badge ([690065f](https://github.com/fingerprintjs/fingerprintjs-pro-spa/commit/690065f27ab1ce327f370c3e1ef4d7289dcd3897))

## [0.5.0](https://github.com/fingerprintjs/fingerprintjs-pro-spa/compare/v0.4.1...v0.5.0) (2022-09-16)


### Features

* update fingerprintjs-pro agent version ([4555ada](https://github.com/fingerprintjs/fingerprintjs-pro-spa/commit/4555ada46dfdd24028be2d9b0691d898925dd6ad))


### Bug Fixes

* link in readme.md ([4c8f8dd](https://github.com/fingerprintjs/fingerprintjs-pro-spa/commit/4c8f8dd4e2102b03fb486b2db40c178a61af21a2))

#### 0.4.1 (2022-06-29)

##### Documentation Changes

*  add more jsdoc comments ([3100b989](https://github.com/fingerprintjs/fingerprintjs-pro-spa/commit/3100b989bb7c90de179ae87865caeafe0c7688ad))

### 0.4.0 (2022-05-25)

##### Chores

*  update fingerprintjs-pro version ([6f3787ae](https://github.com/fingerprintjs/fingerprintjs-pro-spa/commit/6f3787ae72f34a4c0a54b09727014d31b98f2da1))
*  add production environment for publish task ([c4c4d5c3](https://github.com/fingerprintjs/fingerprintjs-pro-spa/commit/c4c4d5c3794e407b72180cd699dc969fadb0890c))
*  don't create tag on release command ([797ac6ba](https://github.com/fingerprintjs/fingerprintjs-pro-spa/commit/797ac6ba106b254d297ba0e0b461438dc4bbe15c))
* **deps:**  bump rollup-plugin-license ([920ed97c](https://github.com/fingerprintjs/fingerprintjs-pro-spa/commit/920ed97c0d3ccc93d5a49179b0220f59259f016a))

##### New Features

*  add reexport `GetResult` and `ExtendedGetResult` types from agent ([8ced12b0](https://github.com/fingerprintjs/fingerprintjs-pro-spa/commit/8ced12b0d28b3cc65c2392e79dcb91831091384e))

#### 0.3.1 (2022-04-06)

##### Chores

*  fix npm publish action, fix commit_pattern ([4a615677](https://github.com/fingerprintjs/fingerprintjs-pro-spa/commit/4a615677ca5c4bc05c20f63e45cd3ab403604d96))
* **deps:**  bump minimist from 1.2.5 to 1.2.6 ([46b93e5e](https://github.com/fingerprintjs/fingerprintjs-pro-spa/commit/46b93e5ef619f1af56a7c233585677a13a45aba8))

### 0.3.0 (2022-04-06)

##### Chores

*  chose correct changelog package ([b925c95d](https://github.com/fingerprintjs/fingerprintjs-pro-spa/commit/b925c95db3f93ef328afd45cdf4afc1ec067d644))
*  tests for integrationInfo ([c05aeb51](https://github.com/fingerprintjs/fingerprintjs-pro-spa/commit/c05aeb5180896cd4abbe7f91ecf9b58ac21b7a92))
*  add --isolatedModules flag for typecheck ([c24a3ece](https://github.com/fingerprintjs/fingerprintjs-pro-spa/commit/c24a3eceeb7c85f0aade9e5e040083db2ba20f79))
*  update fingerprintjs-pro agent version ([b4e9aea6](https://github.com/fingerprintjs/fingerprintjs-pro-spa/commit/b4e9aea6eb4b96036ccf77bfa119678af6be8998))
*  add changelog package for releases ([788c3f58](https://github.com/fingerprintjs/fingerprintjs-pro-spa/commit/788c3f5805ab000f05efb414d300104034fae74d))

##### Documentation Changes

*  Apply suggestions from code review ([6cda818e](https://github.com/fingerprintjs/fingerprintjs-pro-spa/commit/6cda818eacc3d66e8281a634ed3d694c7fab3fc4))
*  add contributing.md ([2172bf4f](https://github.com/fingerprintjs/fingerprintjs-pro-spa/commit/2172bf4f346517910efe22d0d118d8532707f532))

##### New Features

*  add fingerprintjs-pro-spa in integrationInfo ([8091eb68](https://github.com/fingerprintjs/fingerprintjs-pro-spa/commit/8091eb683da49e71c3a8c47eb1ae9e2c52ef4cac))

## 0.2.4
### Documentation Changes
* Change "token" option name to "apiKey"
### Chores
* Incremented `fingerprintjs-pro` version

## 0.2.3
### Chores
* Added re-exports from `fingerprintjs-pro`

## 0.2.2
### Bug Fixes
* edited rollup config

## 0.2.1
### Chores
* CI workflow for publishing

## 0.2.0
* Initial release
