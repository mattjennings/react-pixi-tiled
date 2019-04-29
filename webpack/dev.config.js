const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./base.config.js')
const path = require('path')

const exp = merge(baseConfig(), {
  devtool: 'cheap-module-source-map',
  devServer: {
    inline: true,
    host: '0.0.0.0',
    port: '8000',
    watchOptions: {
      ignored: /node_modules/
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
})

module.exports = exp
