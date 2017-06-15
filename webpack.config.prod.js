var webpack = require('webpack');
var path = require('path');
// `CheckerPlugin` is optional. Use it if you want async error reporting. 
// We need this plugin to detect a `--watch` mode. It may be removed later 
// after https://github.com/webpack/webpack/issues/3460 will be resolved. 
const { CheckerPlugin } = require('awesome-typescript-loader')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    app: "./src/index.ts"
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, "bin")
  },

  // Currently we need to add '.ts' to the resolve.extensions array. 
  resolve: {
    extensions: ['.ts', '.js',]
  },

  // Add the loader for .ts files. 
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [ 'babel-loader', 'awesome-typescript-loader' ],
        exclude: /node_modules/,
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(require("./package.json").version),
      DEBUG: process.env.NODE_ENV !== 'production'
    }),
    new CopyWebpackPlugin([
      { from: './template/**/*' }
    ]),
    new CheckerPlugin()
  ],
  target: 'node'
};