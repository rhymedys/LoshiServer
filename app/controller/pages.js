/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-06 17:00:04
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-07 09:11:02
 */
'use strict';
const Controller = require('egg').Controller;
const response = require('../extend/response');

class PagesController extends Controller {

  /**
   * 根据AppId查询受访地址信息
   *
   * @memberof PagesController
   */
  async queryAllPagesUrlByAppId() {
    const { ctx } = this;
    const { appId, start, limit } = ctx.query;
    const res = await this.ctx.service.pages
      .queryAllPagesUrlByAppId(appId, start, limit)
      .catch(e => {
        this.logger.error(e);
        response.sendFail(ctx);
      });

    if (res && res.length) {
      response.sendSuccess(ctx, res);
    } else {
      response.sendFail(ctx);
    }
  }
}

module.exports = PagesController;
