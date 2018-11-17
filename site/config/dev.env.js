var env = process.env.NODE_ENV

// 配置 路径-项目ip或域名 map
var PATH_URL_MAP = {
  '/api': 'http://127.0.0.1:7001/',
}
var proxy = {}
// 生成代理配置对象
for (var path in PATH_URL_MAP) {
  if (PATH_URL_MAP.hasOwnProperty(path)) {
    proxy[path] = {           // '/api':路径匹配项
      target: PATH_URL_MAP[path], // 接口的域名
      // secure: false,       // 如果是https接口，需要配置这个参数
      changeOrigin: true,
      pathRewrite: {          // pathRewrite重写地址
        [`^${path}`]: path
      }
    }
  }
}

// 本地环境
module.exports = {
  NODE_ENV: '"development"',
  proxy: proxy,
}

