/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-07-27 10:35:34
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-16 16:52:01
 */

'use strict';
const Controller = require('egg').Controller;
const response = require('../extend/response');
const uuidv1 = require('uuid/v1');
const tokenUtils = require('../extend/token');

class LoginController extends Controller {
  async login() {
    const { ctx } = this;
    const { userName = '', passWord = '' } = ctx.request.body;
    if (!userName.trim().length || !passWord.trim().length) {
      response.sendFail(ctx, '账户或密码为空');
    } else {
      const tokenInfo = await tokenUtils.getDBTokenInfoByCookiesToken(ctx);
      if (tokenInfo && tokenInfo.expires > new Date().getTime()) {
        // 已经登录且未过期
        response.sendSuccess(ctx, null, '已经登录且未过期');

      } else {
        const findUserInfoByUserName = await ctx.service.user.findByUserName(userName);
        if (findUserInfoByUserName) {
          if (findUserInfoByUserName.passWord === passWord) {
            const token = uuidv1().replace(/\-/g, '');
            tokenUtils.setTokenToCookies(ctx, token);
            // token 有效期2h
            await tokenUtils.setTokenToDBByUserName(ctx, {
              token,
              userName,
              userId: findUserInfoByUserName.id,
              expires: new Date().getTime() + 1000 * 60 * 60 * 2,
            });

            const resUserInfo = {
              name: userName,
              avatar: findUserInfoByUserName.userImg,
              phone: findUserInfoByUserName.userPhone,
              level: findUserInfoByUserName.level,
            };
            response.sendSuccess(ctx, resUserInfo, '登录成功');
          } else {
            response.sendFail(ctx, '密码错误');
          }
        } else {
          response.sendFail(ctx, '账户不存在');
        }
      }
    }
  }
}

module.exports = LoginController;
