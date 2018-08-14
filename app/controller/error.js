/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-14 14:11:56
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-14 16:28:40
 */
'use strict';

const Controller = require('egg').Controller;
const response = require('../extend/response');

class ErrorController extends Controller {

  /**
   * 获取错误列表
   *
   * @memberof ErrorController
   */
  async getList() {
    const { ctx } = this;
    const res = await ctx.service.error
      .getList(ctx.query)
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


  /**
   * 获取错误列表数量
   *
   * @memberof ErrorController
   */
  async getListCount() {
    const { ctx } = this;
    const res = await ctx.service.error
      .getListCount(ctx.query)
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

module.exports = ErrorController;
