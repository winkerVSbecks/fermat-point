
var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
var data = require('./src/data');

module.exports = {

  entry: './src/entry.js',

  output: {
    filename: 'bundle.js',
    path: __dirname,
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      { test: /\.jsx$/, loader: 'jsx-loader' },
      { test: /\.json$/, loader: 'json-loader' },
    ]
  },

  plugins: [
    new StaticSiteGeneratorPlugin('bundle.js', ['/'], data)
  ]

};

