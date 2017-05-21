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
    path: path.resolve(__dirname, "bin"),
    devtoolModuleFilenameTemplate: function(info){
      return "file:///"+info.absoluteResourcePath;
    }
  },

  // Currently we need to add '.ts' to the resolve.extensions array. 
  resolve: {
    extensions: ['.ts', '.js',]
  },

  // Source maps support ('inline-source-map' also works) 
  devtool: 'source-map',

  // Add the loader for .ts files. 
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [ 'babel-loader', 'awesome-typescript-loader' ],
        exclude: /node_modules/,
      },
      {
          enforce: 'pre',
          test: /\.js$/,
          loader: "source-map-loader"
      },
      {
          enforce: 'pre',
          test: /\.tsx?$/,
          use: "source-map-loader"
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      DEBUG: process.env.NODE_ENV !== 'production'
    }),
    new CopyWebpackPlugin([
      { from: './template/**/*' }
    ]),
    new CheckerPlugin()
  ],
  target: 'node'
};