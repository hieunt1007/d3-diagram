'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: path.join(__dirname),
  // build project with output is d3-diagram.js file
  entry: {
    'd3-diagram': './src/index.ts'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    // it should be built folder
    // to correct hot reload in some case
    publicPath: '/dist/',
    filename: '[name].js',
    library: 'd3Diagram',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    // disable warning whenever we build project
    noParse: [
      /.*dagre\.min\.js$/
    ],
    preLoaders: [
      {
        test: /\.ts$/,
        loader: 'tslint',
        exclude: /(node_modules|dist|demo)/
      }
    ],
    loaders: [
      // all files with a `.ts` extension will be handled by `ts-loader`
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  tslint: {
    emitErrors: true,
    failOnHint: true
  },
  resolve: {
    root: __dirname,
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  devtool: '#source-map',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      minimize: true,
      comments: false,
      compress: {
        warnings: false
      }
    })
  ]
};
