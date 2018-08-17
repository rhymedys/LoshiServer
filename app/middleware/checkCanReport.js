/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-16 14:42:54
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-17 14:37:13
 */

'use strict';
const response = require('../extend/response');

module.exports = () => {
  return async function checkCanReport(ctx, next) {
    const { body } = ctx.request;
    if (!body) {
      response.sendSuccessWithoutContent(ctx);
      console.log('checkCanReport body为null');
      return;
    }

    const appId = body.addData && body.addData.appId;
    if (!appId) {
      response.sendSuccessWithoutContent(ctx);
      console.log('checkCanReport appId为null');

      return;
    }

    const systemInfos = await ctx.service.system
      .queryByAppId(appId)
      .catch(() => {
        response.sendSuccessWithoutContent(ctx);
      });

    if (!systemInfos.length) {
      response.sendSuccessWithoutContent(ctx);
      console.log('checkCanReport systemInfo为null');

      return;
    }

    const systemInfo = systemInfos[0];
    if (systemInfo.isUse !== 0) {
      response.sendSuccessWithoutContent(ctx);
      console.log('checkCanReport isUse=1 不统计');
      return;
    }

    ctx.state.systemInfo = systemInfo;
    await next();
  };
};
