const { merge } = require('webpack-merge')
const webpack = require('webpack')
const baseConfig = require('./webpack.base.config')
const { htmlPluginGenerator } = require('./entryGenerator')

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    compress: true,
    port: 9999,
    liveReload: true,
    client: {
      overlay: {
        errors: true,
        warnings: false
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      API_BASE_URL: JSON.stringify('dev.com')
    }),

    ...htmlPluginGenerator('development')
  ]
})