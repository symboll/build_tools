class Likanghua {
  constructor (options) {
    console.log('plugin options:', options)
    this.options = options
  }

  apply (compiler) {
    compiler.hooks.emit.tap('Likanghua', (compilation) => {
      // compilation 是此次打包的上下文
      // console.log('webpack 构建过程', compilation)
      
      for (const name in compilation.assets) {
        if (name.endsWith(this.options.target)) {
          const contents = compilation.assets[name].source()

          const noComments = contents.replace(/\/\*[\s\S]*?\*\//g, '')

          compilation.assets[name] = {
            source:() => noComments,
            size: () => noComments.length
          }
        }
      }
    })
  }
}


module.exports = Likanghua