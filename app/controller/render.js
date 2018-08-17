/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-16 16:41:41
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-17 13:42:28
 */
'use strict';

const Controller = require('egg').Controller;
const utils = require('../extend/utils');

class RenderController extends Controller {
  async renderAdmin() {
    await this.ctx.render('index.ejs');
  }

  async renderTestDemo() {
    await this.ctx.render('test.ejs');
  }
}

module.exports = RenderController;
