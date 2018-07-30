/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-07-30 14:40:00
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-07-30 15:50:19
 */

'use strict';
const Controller = require('egg').Controller;
const response = require('../extend/response');
const uuidv1 = require('uuid/v1');
const moment = require('moment');
const tokenUtils = require('../extend/token');
class SystemController extends Controller {
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

    await ctx.service.system
      .insert(sysObj)
      .then(res => {
        console.log(res);
        if (res) {
          response.sendSuccess(ctx);
        }
        return res;
      })
      .catch(e => {
        this.logger.error(e);
        response.sendFail(ctx);
      });


  }
}

module.exports = SystemController;
