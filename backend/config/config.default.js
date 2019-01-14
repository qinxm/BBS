"use strict";

module.exports = appInfo => {
  const config = (exports = {});

  config.cssFileDir = '/Users/qinxm/Sites/BBS/github/BBS/site/src/assets/static/css';

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1541594441036_7135";

  // add your config here
  config.middleware = [];

  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '127.0.0.1',
      // 端口号
      port: "3306",
      // 用户名
      user: "bbs",
      user: 'root',
      // 密码
      password: 'password',
      // 数据库名
      database: "bbs"
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false
  };

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
    },
    domainWhiteList: ["http://localhost:7001"]
  };

  config.cors = {
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS"
  };

  config.passportGithub = {
    key: "e0af1b307e707e68341c",
    secret: "65136b600b2b0a3e01b5a781284eb83049fd931e"
    // callbackURL: '/passport/github/callback',
    // proxy: false,
  };

  config.jwt = {
    enable: false,
    secret: "123456"
  };

  return config;
};
// module.exports.jwt = {
//   enable: false,
//   secret: "123456"
// };
