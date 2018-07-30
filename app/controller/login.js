/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-07-27 10:35:34
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-07-30 11:28:01
 */

'use strict';
const Controller = require('egg').Controller;
const response = require('../extend/response');
const uuidv1 = require('uuid/v1');

class LoginController extends Controller {
  async login() {
    const { ctx } = this;
    const { userName = '', passWord = '' } = ctx.request.body;
    if (!userName.trim().length || !passWord.trim().length) {
      response.sendFail(ctx, '账户或密码为空');
    } else {
      const cookiesToken = ctx.cookies.get('token');
      const cookiesTokenExpires = await ctx.service.token.findByToken(cookiesToken) || {};
      if (cookiesToken && cookiesTokenExpires.expires > new Date().getTime()) {
        // 已经登录且未过期
        console.log('已经登录且未过期');
        response.sendSuccess(ctx, null, '已经登录且未过期');

      } else {
        const findUserInfoByUserName = await ctx.service.user.findByUserName(userName);
        if (findUserInfoByUserName) {
          if (findUserInfoByUserName.passWord === passWord) {
            const token = uuidv1().replace(/\-/g, '');
            ctx.cookies.set('token', token);
            // token 有效期2h
            await ctx.service.token.insert({
              token,
              userName,
              expires: new Date().getTime() + 1000 * 60 * 60 * 2,
            });
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
}

module.exports = LoginController;
