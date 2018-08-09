/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-07 10:27:00
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-09 19:27:09
 */

'use strict';
const Controller = require('egg').Controller;
const response = require('../extend/response');
const utils = require('../extend/utils');

class AjaxController extends Controller {


  /**
   * 查询列表
   *
   * @memberof AjaxController
   */
  async queryList() {
    const { ctx } = this;

    const res = await ctx.service.ajax
      .queryList(ctx.query)
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
}

module.exports = AjaxController;
