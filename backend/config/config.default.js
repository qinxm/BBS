'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1541594441036_7135';

  // add your config here
  config.middleware = [];
  
  // config/config.${env}.js
  exports.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '106.12.13.62',
      // 端口号
      port: '3306',
      // 用户名
      user: 'bbs',
      // 密码
      password: 'zXfNGc3G5kXepXcj',
      // 数据库名
      database: 'bbs',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  config.security = {
    csrf: {
        enable: false,
        ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
    },
    domainWhiteList: ['http://localhost:7001']
  };
config.cors = {
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  return config;
};
