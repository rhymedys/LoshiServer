/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-09 19:59:16
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-09 20:01:56
 */

'use strict';
const Controller = require('egg').Controller;
const response = require('../extend/response');

class SlowPagesController extends Controller {

  /**
   * 查询列表
   *
   * @memberof SlowPagesController
   */
  async queryList() {
    const { ctx } = this;
    const res = await ctx.service.slowPages
      .queryList(ctx.query)
      .catch(e => {
        this.logger.error(e);
        response.sendFail(ctx);
      });

    if (res && Object.prototype.toString.call(res) === '[object Array]') {
      response.sendSuccess(
        ctx,
        res
      );
    } else {
      response.sendFail(ctx);
    }
  }
}

module.exports = SlowPagesController;
