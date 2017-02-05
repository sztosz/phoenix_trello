'use strict'

let path = require('path')
let ExtractTextPlugin = require('extract-text-webpack-plugin')
let webpack = require('webpack')

function join (dest) {
  return path.resolve(__dirname, dest)
}

function web (dest) {
  return join('web/static/' + dest)
}

let config = module.exports = {
  entry: {
    application: [
      web('css/application.sass'),
      web('js/application.js')
    ]
  },

  output: {
    path: join('priv/static'),
    filename: 'js/application.js'
  },

  resolve: {
    extensions: ['', '.js', '.sass'],
    moduleDirectories: ['node_modules']
  },

  module: {
    noParse: /vendor\/phoenix/,
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          plugins: ['transform-decorators-legacy'],
          presets: ['react', 'es2015', 'stage-2', 'stage-0']
        }
      },
      {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract('style', path.join('css!sass?indentedSyntax&includePaths[]=', __dirname, '/node_modules'))
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('css/application.css')
  ]
}

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ minimize: true })
  )
}
