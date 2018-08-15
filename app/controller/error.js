/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-14 14:11:56
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-15 14:00:42
 */
'use strict';

const Controller = require('egg').Controller;
const response = require('../extend/response');
const utils = require('../extend/utils');
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


  /**
   * 根据url，category获取错误列表
   *
   * @memberof ErrorController
   */
  async getItemList() {
    const { ctx } = this;
    const res = await ctx.service.error
      .getItemList(ctx.query)
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
          val.createTime ? {
            createTime: utils.formatDate2YYYYMMDDHHMMSS(val.createTime),
          } : null
        ))
      );
    } else {
      response.sendFail(ctx);
    }
  }


  /**
   * 根据url，category获取错误列表数量
   *
   * @memberof ErrorController
   */
  async getItemListCount() {
    const { ctx } = this;
    const res = await ctx.service.error
      .getItemListCount(ctx.query)
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
   * 获取错误详情信息
   *
   * @memberof ErrorController
   */
  async getErrorDetail() {
    const { ctx } = this;
    const res = await ctx.service.error
      .getErrorDetail(ctx.query)
      .catch(e => {
        this.logger.error(e);
        response.sendFail(ctx);
      });

    if (res) {
      response.sendSuccess(
        ctx,
        res
      );
    } else {
      response.sendFail(ctx);
    }
  }

}

module.exports = ErrorController;
