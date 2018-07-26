/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-07-26 10:14:30
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-07-26 10:51:45
 */
'use strict';
const response = require('../extend/response');

module.exports = () => {

  return async function checkSessionIsOverdue(ctx, next) {
    const { sessionId } = ctx.query;
    if (sessionId) {
      const currentTimestamp = new Date().getTime();
      const sessionInfo = await ctx.service.session.findBySessionId(sessionId);
      const { expires } = sessionInfo || {};
      if (expires && expires > currentTimestamp) {
        await next();
      } else {
        response.sendFail(ctx, '登录状态已过期');
      }
    } else {
      response.sendFail(ctx, '登录失败');
    }
  };
};
