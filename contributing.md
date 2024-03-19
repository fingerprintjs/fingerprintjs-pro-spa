# Contributing to FingerprintJS Pro SPA integration

## Working with code

We prefer using [pnpm](https://pnpm.io/) for installing dependencies and running scripts.

The main branch is locked for the push action. For proposing changes, use the standard [pull request approach](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request). It's recommended to discuss fixes or new functionality in the Issues, first.

### Development playground

There is no specific playground for this library, but you can develop it with [fingerprintjs-pro-react](https://github.com/fingerprintjs/fingerprintjs-pro-react), just [link this package](https://pnpm.io/cli/link#replace-an-installed-package-with-a-local-version-of-it) with the `pnpm link <spa-directory>`. You need to build the project before testing the integration.

### How to build

Just run:

```shell
pnpm build
```

### Code style

The code style is controlled by [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/). Run to check that the code style is ok:

```shell
pnpm lint
```

You aren't required to run the check manually, the CI will do it. Run to fix code style mistakes (not all mistakes can be fixed automatically):

```shell
pnpm lint:fix
```

### How to test

Tests located in `__tests__` folder and run by [jest](https://jestjs.io/) in [jsdom](https://github.com/jsdom/jsdom) environment.

To run tests you can use IDE instruments or just run:

```shell
pnpm test
```

To check the distributive TypeScript declarations, build the project and run:

```shell
pnpm test:dts
```

### Committing changes

We follow [Conventional Commits](https://conventionalcommits.org/) for committing changes. We use git hooks to check that the commit message is correct.

### How to publish

The library is automatically released and published to NPM on every push to the main branch if there are relevant changes. The workflow must be approved by one of the maintainers, first.

### Generating docs

We use [typedoc](https://typedoc.org/) to generate docs. To generate docs run:

```shell
pnpm docs
```

The docs will be generated into [./docs](./docs) directory.

The docs are automatically deployed to Github Pages on every push to the main branch.
