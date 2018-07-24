'use strict';

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

  return config;
};
