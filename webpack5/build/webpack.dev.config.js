const { merge } = require('webpack-merge')
const webpack = require('webpack')
const baseConfig = require('./webpack.base.config')
const { htmlPluginGenerator } = require('./entryGenerator')
const Likanghua = require('../cutsom/plugin')

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    // 启动gizp压缩
    compress: true,
    port: 9999,
    liveReload: true,
    client: {
      overlay: {
        errors: true,
        warnings: false
      }
    },
    proxy: {
      '/api': {
        // 访问http://localhost:9999/api/user => https://api.github.com/api/users
        target: 'https://api.github.com',
        // 访问http://localhost:9999/api/user => https://api.github.com/users
        pathRewrite:{
          '^/api':''
        },
        changeOrigin: true
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      API_BASE_URL: JSON.stringify('dev.com')
    }),
    new Likanghua({ target: 'css' }),
    ...htmlPluginGenerator('development')
  ]
})