/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-02 11:49:52
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-02 11:55:11
 */
'use strict';
const Controller = require('egg').Controller;
const tokenUtils = require('../extend/token');
const response = require('../extend/response');


class UserController extends Controller {
  async query() {
    const { ctx } = this;
    const tokenInfo = await tokenUtils.getDBTokenInfoByCookiesToken(ctx);
    if (tokenInfo) {
      const userInfo = await ctx.service.user
        .findByUserName(tokenInfo.userName)
        .catch(e => {
          this.logger.error(e);
          response.sendFail(ctx);
        });

      if (userInfo) {
        response.sendSuccess(ctx, {
          name: userInfo.userName,
          avatar: userInfo.userImg,
          phone: userInfo.userPhone,
          level: userInfo.level,
        });
      }
    } else {
      response.sendFail(ctx);
    }
  }
}

module.exports = UserController;
