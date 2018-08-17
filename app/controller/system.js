/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-07-30 14:40:00
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-17 14:36:55
 */

'use strict';
const Controller = require('egg').Controller;
const response = require('../extend/response');
const uuidv1 = require('uuid/v1');
const moment = require('moment');
const tokenUtils = require('../extend/token');
const utils = require('../extend/utils');
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
      isUse: isStatisiPages || isStatisiAjax || isStatisiResource || isStatisiSystem || isStatisiError ? 0 : 1,
      slowPageTime: slowPageTime || 8,
      slowJsTime: slowJsTime || 2,
      slowCssTime: slowCssTime || 1,
      slowImgTime: slowImgTime || 2,
      slowAajxTime: slowAajxTime || 2,
      userId,
      isStatisiPages: isStatisiPages ? 0 : 1,
      isStatisiAjax: isStatisiAjax ? 0 : 1,
      isStatisiResource: isStatisiResource ? 0 : 1,
      isStatisiSystem: isStatisiSystem ? 0 : 1,
      isStatisiError: isStatisiError ? 0 : 1,
      createTime: moment().format('YYYY-MM-DD HH:mm:ss'),
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
      systemName,
      script = '',
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
      if (res && res[0]) {
        const payload = Object.assign({}, res[0], {
          systemName,
          script,
          isUse: isStatisiPages || isStatisiAjax || isStatisiResource || isStatisiSystem || isStatisiError ? 0 : 1,
          slowPageTime: slowPageTime || 8,
          slowJsTime: slowJsTime || 2,
          slowCssTime: slowCssTime || 1,
          slowImgTime: slowImgTime || 2,
          slowAajxTime: slowAajxTime || 2,
          isStatisiPages: isStatisiPages ? 0 : 1,
          isStatisiAjax: isStatisiAjax ? 0 : 1,
          isStatisiResource: isStatisiResource ? 0 : 1,
          isStatisiSystem: isStatisiSystem ? 0 : 1,
          isStatisiError: isStatisiError ? 0 : 1,
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
          rows: systemsInfo[0]
            .map(val => Object.assign({}, val, {
              createTime: utils.formatDate2YYYYMMDDHHMMSS(val.createTime),
            })),
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

      if (appConfig && appConfig[0] && appConfig[0].appId) {
        response.sendSuccess(
          ctx,
          Object.assign(
            {},
            appConfig[0],
            {
              createTime: utils.formatDate2YYYYMMDDHHMMSS(appConfig[0].createTime),
            }
          )
        );
      } else {
        response.sendFail(ctx);
      }
    } else {
      response.sendFail(ctx);
    }
  }
}

module.exports = SystemController;
