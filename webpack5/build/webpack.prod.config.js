const { merge } = require('webpack-merge')
const webpack = require('webpack')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


const baseConfig = require('./webpack.base.config')
const { htmlPluginGenerator } = require('./entryGenerator')

module.exports = merge(baseConfig, {
  mode: 'production',
  // output: {
  //   publicPath: './',
  // },
  devtool: 'nosources-source-map',
  plugins: [
    new webpack.DefinePlugin({
      API_BASE_URL: JSON.stringify('prod.com')
    }),

    //压缩css
    new OptimizeCssAssetsPlugin(),

    // 清除 dist
    new CleanWebpackPlugin(),

    ...htmlPluginGenerator('production')
  ]
})
