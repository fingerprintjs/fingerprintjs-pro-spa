# Contributing to FingerprintJS Pro SPA integration

## Working with code

We prefer to use [yarn](https://yarnpkg.com/) for installing dependencies and running scripts

Main branch is locked for push, so use branches to make changes and create pull request to review code and merge it in main.

### Development playground

There is no specific playground for this library, but you can develop it with [fingerprintjs-pro-react](https://github.com/fingerprintjs/fingerprintjs-pro-react), just [link package](https://yarnpkg.com/cli/link) with `yarn link`.

❗ Build project before testing integration

### How to build
Just run:
```shell
yarn build
```

### Code style

The code style is controlled by [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/). Run to check that the code style is ok:
```shell
yarn lint
```

You aren't required to run the check manually, the CI will do it. Run to fix code style mistakes (not all mistakes can be fixed automatically):
```shell
yarn lint:fix
```

### How to test
Tests located in `__tests__` folder and run by [jest](https://jestjs.io/) in [jsdom](https://github.com/jsdom/jsdom) environment.

To run tests you can use IDE instruments or just run:
```shell
yarn test
```

To check the distributive TypeScript declarations, build the project and run:
```shell
yarn test:dts
```

### How to publish
- Create new brunch
- Run `yarn release:(major|minor|patch)` depending on version you need
- Make PR
- After merging PR in main, GitHub action will new version to npm