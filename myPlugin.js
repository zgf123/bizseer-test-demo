const path = require('path')
const fs = require('fs-extra')

module.exports = (compiler, params) => {
  compiler.hooks.compile.tap('MyPlugin', (compilation) => {
    console.log(params)

    const fileContent = params.toString()
    fs.outputFileSync(path.resolve(__dirname, './log.txt'), fileContent)
  })
}
