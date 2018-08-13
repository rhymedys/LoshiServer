/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-07 10:27:00
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-13 13:49:18
 */

'use strict';
const Controller = require('egg').Controller;
const response = require('../extend/response');
const utils = require('../extend/utils');

class SlowResourceController extends Controller {

  /**
   * 通过URL查询列表
   *j
   * @memberof SlowResourceController
   */
  async queryListByCallUrl() {
    const { ctx } = this;
    const res = await ctx.service.slowResource
      .queryListByCallUrl(ctx.query)
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
   * 通过URL查询列表数量
   *
   * @memberof SlowResourceController
   */
  async queryListCountByCallUrl() {
    const { ctx } = this;
    const res = await ctx.service.slowResource
      .queryListCountByCallUrl(ctx.query)
      .catch(e => {
        this.logger.error(e);
        response.sendFail(ctx);
      });

    if (res && Object.prototype.toString.call(res) === '[object Array]') {
      console.log(res);
      response.sendSuccess(
        ctx,
        res[0] ? res[0].count : 0
      );
    } else {
      response.sendFail(ctx);
    }
  }
}

module.exports = SlowResourceController;
