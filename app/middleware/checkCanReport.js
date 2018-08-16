/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-16 14:42:54
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-16 14:57:48
 */

'use strict';
const response = require('../extend/response');

module.exports = () => {
  return async function checkCanReport(ctx, next) {
    const { body } = ctx.request;
    if (!body) {
      response.sendSuccessWithoutContent(ctx);
      return;
    }

    const appId = body.addData && body.addData.appId;
    if (!appId) {
      response.sendSuccessWithoutContent(ctx);
      return;
    }

    const systemInfo = await ctx.service.system
      .queryByAppId(appId)
      .catch(() => {
        response.sendSuccessWithoutContent(ctx);
      });

    if (!systemInfo) {
      response.sendSuccessWithoutContent(ctx);
      return;
    }

    ctx.state.systemInfo = systemInfo;
    await next();

  };
};
