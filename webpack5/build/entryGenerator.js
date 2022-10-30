const HTMLWebpackPlugin = require('html-webpack-plugin')

const entry = {
  index: './src/index.js',
  about: './src/about.js'
}

const titleMap = {
  index: '首页',
  about: '关于'
}

const htmlPluginGenerator = (mode) => {
  const keys = Object.keys(entry)
  const res = []
  for (const key of keys) {
    const config = {
      template: 'src/template/index.ejs',
      title: titleMap[key],
      chunks: [key],
      filename: `${key}.html`,
      favicon: 'src/template/favicon.ico',
    }
    if (mode === 'production') {
      config.minify = {
        removeComments: true,
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      }
    }

    res.push(new HTMLWebpackPlugin(config))
  }

  return res
}

module.exports =  {
  entry,
  htmlPluginGenerator
}