/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-07-30 13:38:57
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-16 14:41:33
 */
'use strict';

const response = require('../extend/response');
const tokenUtils = require('../extend/token');
module.exports = () => {
  return async function checkTokenIsLogin(ctx, next) {
    const tokenInfo = await tokenUtils.getDBTokenInfoByCookiesToken(ctx);
    if (tokenInfo && tokenInfo.expires > new Date().getTime()) {
      ctx.state.tokenInfo = tokenInfo;
      await next();
    } else {
      response.sendFail(ctx, '登录状态失效');
    }
  };
};
