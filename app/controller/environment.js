/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-07 10:27:00
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-07 10:42:55
 */

'use strict';
const Controller = require('egg').Controller;
const response = require('../extend/response');

class EnvironmentController extends Controller {

  /**
   * 查询当前url访问的环境配置
   *
   * @memberof EnvironmentController
   */
  async queryUrlEnvironmentByType() {
    const { ctx } = this;
    const { url, type } = ctx.query;
    const res = await ctx.service.environment
      .queryUrlEnvironmentByType(url, type)
      .catch(e => {
        this.logger.error(e);
        response.sendFail(ctx);
      });

    if (res && Object.prototype.toString.call(res) === '[object Array]') {
      response.sendSuccess(ctx, res);
    } else {
      response.sendFail(ctx);
    }
  }
}

module.exports = EnvironmentController;