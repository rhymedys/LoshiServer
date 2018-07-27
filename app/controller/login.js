/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-07-27 10:35:34
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-07-27 11:57:57
 */

'use strict';
const Controller = require('egg').Controller;
const response = require('../extend/response');

class LoginController extends Controller {
  async login() {
    const { ctx } = this;
    const { userName = '', passWord = '' } = ctx.request.body;
    if (!userName.trim().length || !passWord.trim().length) {
      response.sendFail(ctx, '账户或密码为空');
    } else {
      const findUserInfoByUserName = await ctx.service.user.findByUserName(userName);
      if (findUserInfoByUserName) {
        if (findUserInfoByUserName.passWord === passWord) {
          ctx.rotateCsrfSecret();
          response.sendSuccess(ctx, null, '登录成功');
        } else {
          response.sendFail(ctx, '密码错误');
        }
      } else {
        response.sendFail(ctx, '账户不存在');
      }
    }
  }
}

module.exports = LoginController;
