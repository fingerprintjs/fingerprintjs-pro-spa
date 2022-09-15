const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')

require('dotenv').config()

module.exports = (env, { mode = 'development' }) => ({
  entry: './index.ts',
  mode,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          compilerOptions: {
            sourceMap: true,
          },
        },
      },
      {
        test: /\.(jpe?g|png|svg|ico)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'assets',
          name: '[name].[ext]?[contenthash]',
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: require('./terser.config.js'),
      }),
    ],
  },
  devtool: mode === 'development' ? 'inline-source-map' : 'source-map',
  output: {
    filename: '[name].js?[contenthash]',
  },
  devServer: {
    host: '0.0.0.0',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(mode),
      'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      title: `FingerprintJS ${mode === 'development' ? 'Playground' : 'Demo'}`,
    }),
  ],
})
