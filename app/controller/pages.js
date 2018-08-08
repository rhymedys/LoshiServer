/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-06 17:00:04
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-08 11:45:45
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
      .queryAllPagesUrlByAppId(appId)
      .catch(e => {
        this.logger.error(e);
        response.sendFail(ctx);
      });

    if (res && Object.prototype.toString.call(res) === '[object Array]') {
      response.sendSuccess(ctx, {
        rows: res.slice(start, limit),
        results: res.length,
      });
    } else {
      response.sendFail(ctx);
    }
  }


  /**
   * 通过url查询情况
   *
   * @memberof PagesController
   */
  async queryPagesByUrl() {
    const { ctx } = this;
    const { url, start, limit } = ctx.query;
    const res = await this.ctx.service.pages
      .queryPagesByUrl(url)
      .catch(e => {
        this.logger.error(e);
        response.sendFail(ctx);
      });

    if (res && Object.prototype.toString.call(res) === '[object Array]') {
      response.sendSuccess(ctx, {
        rows: res.slice(start, limit),
        results: res.length,
      });
    } else {
      response.sendFail(ctx);
    }
  }


  /**
   *根据Url，创建时间范围查询性能概况
   *
   * @memberof PagesController
   */
  async queryPagesSimpleInfoByUrlAndTime() {
    const { ctx } = this;
    const { url, startCreateTime, endCreateTime } = ctx.query;
    const res = await this.ctx.service.pages
      .queryPagesSimpleInfoByUrlAndTime(url, startCreateTime, endCreateTime)
      .catch(e => {
        this.logger.error(e);
        response.sendFail(ctx);
      });

    if (res && Object.prototype.toString.call(res) === '[object Array]') {
      response.sendSuccess(ctx, res[0]);
    } else {
      response.sendFail(ctx);
    }

  }
}

module.exports = PagesController;
