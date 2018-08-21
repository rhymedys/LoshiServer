/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-07-30 13:38:57
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-21 11:15:29
 */
'use strict';

const tokenUtils = require('../extend/token');

module.exports = () => {
  return async function checkIsLogin(ctx, next) {
    if (ctx.url.indexOf('/admin/user/login') === 0) {
      await next();
    } else {
      const tokenInfo = await tokenUtils.getDBTokenInfoByCookiesToken(ctx);
      if (tokenInfo && tokenInfo.expires > new Date().getTime()) {
        ctx.state.tokenInfo = tokenInfo;
        await next();
      } else {
        ctx.redirect(`/admin/user/login?redirect_uri=${encodeURIComponent(`${ctx.origin}${ctx.originalUrl}`)}`);
      }
    }
  };
};
