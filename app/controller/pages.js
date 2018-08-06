/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-06 17:00:04
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-06 17:01:58
 */
'use strict';
const Controller = require('egg').Controller;
const response = require('../extend/response');

class PagesController extends Controller {
  async queryAllPagesUrlByAppId() {
    const { ctx } = this;
    const res = await this.ctx.service.pages.queryAllPagesUrlByAppId(16);
    console.log(res);
  }
}

module.exports = PagesController;
