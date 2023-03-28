const path = require('path')
const fs = require('fs-extra')

module.exports = (compiler, params) => {
  compiler.hooks.run.tap('aaa', (compilation) => {
    console.log(2)
  })
  compiler.hooks.beforeRun.tap('aaa1', (compilation) => {
    console.log(1)
  })
  compiler.hooks.normalModuleFactory.tap('aaa2', (compilation) => {
    console.log(compilation)
  })

  // compiler.hooks.emit.tap('CodeBeautify', (compilation) => {
  // const assets = compilation.getAssets()
  // compilation.hooks.buildModule.tap('SourceMapDevToolModuleOptionsPlugin', (module) => {
  //   console.log(123)
  // })
  // Object.keys(compilation.assets).forEach((data) => {
  //   console.log(data)
  //   let content = compilation.assets[data].source() // 获取处理的文本
  //   content = content.replace(reg, function (word) {
  //     // 去除注释后的文本return /^/{2,}/.test(word) || /^/*!/.test(word) || /^/*{3,}//.test(word) ? "" : word;
  //   })
  //   compilation.assets[data] = {
  //     source() {
  //       return content
  //     },
  //     size() {
  //       return content.length
  //     },
  //   }
  // })
  // })
  // compiler.hooks.emit.tap('MyPlugin', (compilation) => {
  //   console.log(compilation.assets)
  //   console.log(JSON.stringify(compilation.assets))
  //   const fileContent = JSON.stringify(compilation.assets)
  //   fs.outputFileSync(path.resolve(__dirname, './log.txt'), fileContent)
  // })
}
