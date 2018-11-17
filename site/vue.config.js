const devEnv = require('./config/dev.env.js')
const path = require('path')
module.exports = {
  lintOnSave: false, // 配置eslint
  baseUrl: process.env.NODE_ENV === 'production'
  ? '/production-sub-path/'
  : '/',
  devServer: {
    port: 8081,
    proxy: devEnv.proxy,
    // alias: {
    //   '@': path.resolve(__dirname, './src'),
    // }
  }

}