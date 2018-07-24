/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-07-24 11:14:30
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-07-24 16:59:43
 */
'use strict';
const Controller = require('egg').Controller;
const qs = require('qs');
const response = require('../extend/response');

class CheckWXMiniProgramLoginController extends Controller {


  /**
   * 登录凭证校验接口
   *
   * @memberof CheckWXMiniProgramLoginController
   */
  async login() {
    const { ctx } = this;
    if (ctx.query.code) {
      const jscode2sessionBody = Object.assign({}, ctx.app.config.WXMiniProgramInfo, {
        js_code: ctx.query.code,
      });

      const jscode2sessionRes = await ctx.curl(`https://api.weixin.qq.com/sns/jscode2session?${qs.stringify(jscode2sessionBody)}`, {
        dataType: 'json',
      });

      if (jscode2sessionRes.status === 200 && jscode2sessionRes.data.errcode !== 40029) {
        const resData = {
          JSESSIONID: jscode2sessionRes.data.session_key,
          expires: jscode2sessionRes.data.expires_in,
        };

        ctx.service.session
          .insert(Object.assign({
            openId: jscode2sessionRes.data.openid,
          }, resData))
          .then(() => {
            response.sendSuccess(ctx, resData);
          });
      } else {
        response.sendFail(ctx);
      }
    }
  }
}

module.exports = CheckWXMiniProgramLoginController;
