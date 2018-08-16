/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-07 10:27:00
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-16 14:42:00
 */

'use strict';
const Controller = require('egg').Controller;
const response = require('../extend/response');
const utils = require('../extend/utils');

class AjaxController extends Controller {


  /**
   * 通过Url查询列表
   *
   * @memberof AjaxController
   */
  async queryListGroupByNameByCallUrl() {
    const { ctx } = this;
    const res = await ctx.service.ajax
      .queryListGroupByNameByCallUrl(ctx.query)
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
   * 通过Url查询列表数量
   *
   * @memberof AjaxController
   */
  async queryListCountGroupByNameByCallUrl() {
    const { ctx } = this;

    const res = await ctx.service.ajax
      .queryListCountGroupByNameByCallUrl(ctx.query)
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

module.exports = AjaxController;
