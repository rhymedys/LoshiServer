/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-07 10:27:00
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-16 19:48:36
 */

'use strict';
const Controller = require('egg').Controller;
const response = require('../extend/response');
const getDefaultDuration = require('../extend/getDefaultDuration');

class EnvironmentController extends Controller {

  /**
   * 查询当前url访问的环境配置
   *
   * @memberof EnvironmentController
   */
  async queryUrlEnvironmentByType() {
    const { ctx } = this;
    const { type } = ctx.query;
    let res;

    if (type) {
      res = await ctx.service.environment
        .queryUrlEnvironmentByType(Object.assign(getDefaultDuration(), ctx.query))
        .catch(e => {
          this.logger.error(e);
          response.sendFail(ctx);
        });
    } else {
      res = await Promise.all([
        ctx.service.environment
          .queryUrlEnvironmentByType(Object.assign({ type: 1 }, getDefaultDuration(), ctx.query)),
        ctx.service.environment
          .queryUrlEnvironmentByType(Object.assign({ type: 2 }, getDefaultDuration(), ctx.query)),
        ctx.service.environment
          .queryUrlEnvironmentByType(Object.assign({ type: 3 }, getDefaultDuration(), ctx.query)),
      ])
        .catch(e => {
          this.logger.error(e);
          response.sendFail(ctx);
        });
    }


    if (res && Object.prototype.toString.call(res) === '[object Array]') {
      response.sendSuccess(ctx, res);
    } else {
      response.sendFail(ctx);
    }

  }
}

module.exports = EnvironmentController;
