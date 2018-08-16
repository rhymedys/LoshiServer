'use strict';
const path = require('path');

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1532401204088_5443';

  // add your config here
  config.middleware = [];

  config.WXMiniProgramInfo = {
    appid: 'wx5aa27a03d5399059',
    secret: '56730088c4d53cafb62229cab23147bf',
    js_code: '',
    grant_type: 'authorization_code',
  };


  config.mongoose = {
    client: {
      url: 'mongodb://localhost:27017/loshi',
      options: {
        useNewUrlParser: true,
      },
    },
  };


  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '123456',
      // 数据库名
      database: 'web-performance',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };
  // config.middleware = [ 'checkSession' ];

  config.security = {
    csrf: {
      useSession: false, // 默认为 false，当设置为 true 时，将会把 csrf token 保存到 Session 中
    },
    // xframe: {
    //   enable: false,
    // },
  };

  // config/config.prod.js
  config.assets = {
    publicPath: '/public/',
  };

  config.view = {
    root: [
      path.join(appInfo.baseDir, 'app/view'),
    ].join(','),
    mapping: {
      '.ejs': 'ejs',
    },
  };

  return config;
};
