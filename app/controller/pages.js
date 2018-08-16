/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-06 17:00:04
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-16 19:48:02
 */
'use strict';
const Controller = require('egg').Controller;
const response = require('../extend/response');
const utils = require('../extend/utils');
const getDefaultDuration = require('../extend/getDefaultDuration');


class PagesController extends Controller {


  /**
   * 根据AppId查询受访地址信息
   *
   * @memberof PagesController
   */
  async queryAllPagesUrlByAppId() {
    const { ctx } = this;
    const res = await this.ctx.service.pages
      .queryAllPagesUrlByAppId(Object.assign(getDefaultDuration(), ctx.query))
      .catch(e => {
        this.logger.error(e);
        response.sendFail(ctx);
      });

    if (res && Object.prototype.toString.call(res) === '[object Array]') {
      response.sendSuccess(
        ctx,
        res.map(val => Object.assign({}, val, {
          createTime: utils.formatDate2YYYYMMDDHHMMSS(val.createTime),
        }))
      );
    } else {
      response.sendFail(ctx);
    }
  }

  /**
   * 通过AppId查询该AppId下的受访地址信息数量
   *
   * @memberof PagesController
   */
  async queryAllPagesUrlCountByAppId() {
    const { ctx } = this;
    const res = await this.ctx.service.pages
      .queryAllPagesUrlCountByAppId(Object.assign(getDefaultDuration(), ctx.query))
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


  /**
   * 通过url查询情况
   *
   * @memberof PagesController
   */
  async queryPagesByUrl() {
    const { ctx } = this;
    const res = await this.ctx.service.pages
      .queryPagesByUrl(ctx.query)
      .catch(e => {
        this.logger.error(e);
        response.sendFail(ctx);
      });

    if (res && Object.prototype.toString.call(res) === '[object Array]') {
      response.sendSuccess(
        ctx,
        res.map(val => Object.assign({}, val, {
          createTime: utils.formatDate2YYYYMMDDHHMMSS(val.createTime),
        }))
      );
    } else {
      response.sendFail(ctx);
    }
  }


  /**
   * 通过url查询url的加载情况的数量
   *
   * @memberof PagesController
   */
  async queryPagesCountByUrl() {
    const { ctx } = this;
    const res = await this.ctx.service.pages
      .queryPagesCountByUrl(ctx.query)
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


  /**
   *根据Url，创建时间范围查询性能概况
   *
   * @memberof PagesController
   */
  async queryPagesSimpleInfoByUrlAndTime() {
    const { ctx } = this;
    const { url, startDate, endDate } = Object.assign(getDefaultDuration(), ctx.query);
    const res = await this.ctx.service.pages
      .queryPagesSimpleInfoByUrlAndTime({ url, startCreateTime: startDate, endCreateTime: endDate })
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
