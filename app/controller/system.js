/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-07-30 14:40:00
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-03 15:36:11
 */

'use strict';
const Controller = require('egg').Controller;
const response = require('../extend/response');
const uuidv1 = require('uuid/v1');
const moment = require('moment');
const tokenUtils = require('../extend/token');
class SystemController extends Controller {
  /**
   * 新建应用
   *
   * @memberof SystemController
   */
  async create() {

    const { ctx } = this;
    const userInfo = await tokenUtils.getDBTokenInfoByCookiesToken(ctx);
    let userId = '';
    if (userInfo) {
      const { id } = await ctx.service.user.findByUserName(userInfo.userName);
      userId = id;
    }


    const {
      systemDomain,
      systemName,
      script = '',
      isUse,
      slowPageTime,
      slowJsTime,
      slowCssTime,
      slowImgTime,
      slowAajxTime,
      isStatisiPages,
      isStatisiAjax,
      isStatisiResource,
      isStatisiSystem,
      isStatisiError,
    } = ctx.request.body;

    const sysObj = {
      systemDomain,
      systemName,
      script,
      isUse,
      slowPageTime,
      slowJsTime,
      slowCssTime,
      slowImgTime,
      slowAajxTime,
      userId,
      isStatisiPages,
      isStatisiAjax,
      isStatisiResource,
      isStatisiSystem,
      isStatisiError,
      createTime: moment().format('YYYY-MM-DD hh:mm:ss'),
      appId: uuidv1().replace(/\-/g, ''),
    };

    const res = await ctx.service.system
      .insert(sysObj)
      .catch(e => {
        this.logger.error(e);
        response.sendFail(ctx);
      });

    if (res) {
      response.sendSuccess(ctx);
    } else {
      response.sendFail(ctx);
    }
  }


  /**
   * 删除应用
   *
   * @memberof SystemController
   */
  async delete() {
    const { ctx } = this;
    const { appId } = ctx.query;
    if (appId) {
      const res = await ctx.service.system
        .deleteByAppId(appId)
        .catch(e => {
          this.logger.error(e);
          response.sendFail(ctx);
        });
      if (res) {
        response.sendSuccess(ctx);
      } else {
        response.sendFail(ctx);
      }
    } else {
      response.sendFail(ctx);
    }
  }


  /**
   * 更新应用
   *
   * @memberof SystemController
   */
  async update() {
    const { ctx } = this;
    const {
      systemDomain,
      systemName,
      script = '',
      isUse,
      slowPageTime,
      slowJsTime,
      slowCssTime,
      slowImgTime,
      slowAajxTime,
      isStatisiPages,
      isStatisiAjax,
      isStatisiResource,
      isStatisiSystem,
      isStatisiError,
      appId,
    } = ctx.request.body;

    if (appId) {
      const res = await ctx.service.system
        .queryByAppId(appId)
        .catch(e => {
          this.logger.error(e);
          response.sendFail(ctx);
        });
      if (res) {
        const payload = Object.assign({}, res, {
          systemDomain,
          systemName,
          script,
          isUse,
          slowPageTime,
          slowJsTime,
          slowCssTime,
          slowImgTime,
          slowAajxTime,
          isStatisiPages,
          isStatisiAjax,
          isStatisiResource,
          isStatisiSystem,
          isStatisiError,
        });

        const updateByAppIdRes = await ctx.service.system
          .updateByAppId(payload)
          .catch(e => {
            this.logger.error(e);
            response.sendFail(ctx);
          });

        if (updateByAppIdRes) {
          response.sendSuccess(ctx);

        } else {
          response.sendFail(ctx);
        }
      } else {
        response.sendFail(ctx);
      }
    } else {
      response.sendFail(ctx);
    }
  }


  /**
   * 查询挡墙用户的应用
   *
   * @memberof SystemController
   */
  async queryByCurrentUser() {
    const { ctx } = this;
    const userInfo = await tokenUtils.getDBTokenInfoByCookiesToken(ctx);
    const { start, limit } = ctx.query;
    if (userInfo) {
      const systems = ctx.service.system
        .queryByUserIdAndStartAndLimit(userInfo.userId, start, limit);
      const systemsTotalCount = ctx.service.system
        .querySystemTotalCountByUserId(userInfo.userId);
      const systemsInfo = await Promise.all([ systems, systemsTotalCount ])
        .catch(e => {
          this.logger.error(e);
          response.sendFail(ctx);
        });

      if (systems) {
        response.sendSuccess(ctx, {
          rows: systemsInfo[0],
          results: systemsInfo[1],
        });
      } else {
        response.sendFail(ctx);
      }
    } else {
      response.sendFail(ctx);
    }
  }


  /**
   * 通过AppId查询应用设置
   *
   * @memberof SystemController
   */
  async queryByAppId() {
    const { ctx } = this;
    const { appId } = ctx.query;
    if (appId) {
      const appConfig = await ctx.service.system
        .queryByAppId(appId)
        .catch(e => {
          this.logger.error(e);
          response.sendFail(ctx);
        });

      if (appConfig && appConfig.appId) {
        response.sendSuccess(ctx, appConfig);
      } else {
        response.sendFail(ctx);
      }
    } else {
      response.sendFail(ctx);
    }
  }
}

module.exports = SystemController;
