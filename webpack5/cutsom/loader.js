const { urlToRequest,getHashDigest,interpolateName,isUrlRequest } = require('loader-utils')
const { marked } = require('marked')

module.exports = (source) => {
  console.log('source----->>>', source)
  console.log('utils:', urlToRequest,getHashDigest,interpolateName,isUrlRequest)

  // const options  = getOptions(this)
  // console.log('options', options)

  const html = marked(source)

  return `module.exports=${JSON.stringify(html)}`
}
