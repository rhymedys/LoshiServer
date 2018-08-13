/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-09 19:59:16
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-13 10:12:38
 */

'use strict';
const Controller = require('egg').Controller;
const response = require('../extend/response');
const utils = require('../extend/utils');

class SlowPagesController extends Controller {

  /**
   * 通过url查询列表
   *
   * @memberof SlowPagesController
   */
  async querListByUrl() {
    const { ctx } = this;
    const res = await ctx.service.slowPages
      .querListByUrl(ctx.query)
      .catch(e => {
        this.logger.error(e);
        response.sendFail(ctx);
      });

    if (res && Object.prototype.toString.call(res) === '[object Array]') {
      response.sendSuccess(
        ctx,
        res.map(val => Object.assign(
          {},
          val,
          {
            createTime: utils.formatDate2YYYYMMDDHHMMSS(val.createTime),
          }
        ))
      );
    } else {
      response.sendFail(ctx);
    }
  }

  /**
   * 通过url查询列表数量
   *
   * @memberof SlowPagesController
   */
  async querListCountByUrl() {
    const { ctx } = this;
    const res = await ctx.service.slowPages
      .querListCountByUrl(ctx.query)
      .catch(e => {
        this.logger.error(e);
        response.sendFail(ctx);
      });

    if (res && Object.prototype.toString.call(res) === '[object Array]') {
      response.sendSuccess(
        ctx,
        res[0] ? res[0].count : 0
      );
    } else {
      response.sendFail(ctx);
    }
  }
}

module.exports = SlowPagesController;
