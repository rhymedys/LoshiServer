/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-07-24 16:53:25
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-07-24 17:04:18
 */
'use strict';
module.exports = () => {
  return async function notFoundHandler(ctx, next) {
    await next();
    if (ctx.status === 404 && !ctx.body) {
      if (ctx.acceptJSON) {
        ctx.body = { error: 'Not Found' };
      } else {
        ctx.body = '<h1>Page Not Found</h1>';
      }
    }
  };
};
