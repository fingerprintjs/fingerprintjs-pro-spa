import typescript from '@rollup/plugin-typescript'
import jsonPlugin from '@rollup/plugin-json'
import { dts } from 'rollup-plugin-dts'
import licensePlugin from 'rollup-plugin-license'
import { join } from 'path'
const { dependencies } = require('./package.json')

const inputFile = 'src/index.ts'
const outputDirectory = 'dist'

const commonBanner = licensePlugin({
  banner: {
    content: {
      file: join(__dirname, 'resources', 'license_banner.txt'),
    },
  },
})

const commonInput = {
  input: inputFile,
  plugins: [jsonPlugin(), typescript(), commonBanner],
}

const commonOutput = {
  exports: 'named',
}

export default [
  // NPM bundles. They have all the dependencies excluded for end code size optimization.
  {
    ...commonInput,
    external: Object.keys(dependencies),
    output: [
      // CJS for usage with `require()`
      {
        ...commonOutput,
        file: `${outputDirectory}/fp-pro-spa.cjs.js`,
        format: 'cjs',
      },

      // ESM for usage with `import`
      {
        ...commonOutput,
        file: `${outputDirectory}/fp-pro-spa.esm.js`,
        format: 'es',
      },
    ],
  },

  // TypeScript definition
  {
    ...commonInput,
    plugins: [dts(), commonBanner],
    output: {
      file: `${outputDirectory}/fp-pro-spa.d.ts`,
      format: 'es',
    },
  },
]
