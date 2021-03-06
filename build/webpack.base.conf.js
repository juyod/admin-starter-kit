var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')
var precss = require('precss')
var autoprefixer = require('autoprefixer')

module.exports = {
  entry: config.entrys,
  output: {
    path: config.build.assetsRoot,
    publicPath: config.build.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'src': path.resolve(__dirname, '../src/client'),
      'components': path.resolve(__dirname, '../src/client/app/components'),
      'assets': path.resolve(__dirname, '../src/client/assets'),
      'styles': path.resolve(__dirname, '../src/client/styles')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    preLoaders: [{
      test: /\.js$/,
      loader: 'eslint',
      include: projectRoot,
      exclude: /node_modules/
    }],
    loaders: [{
      test: /\.js$/,
      loader: 'ng-annotate!babel',
      include: projectRoot,
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url',
      query: {
        limit: 10000,
        name: utils.assetsPath('img/[name].[hash:7].[ext]')
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url',
      query: {
        limit: 10000,
        name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
      }
    }]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  postcss: function () {
    return [precss, autoprefixer({ browsers: ['last 2 versions'] })]
  }
}
