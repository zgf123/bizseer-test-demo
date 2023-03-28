const path = require('path')
const MyPlugin = require('./myPlugin')

module.exports = {
  webpack: {
    plugins: [(compiler) => MyPlugin(compiler, 111)],
  },
  devServer: {
    port: 8888,
  },
}
