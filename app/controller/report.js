'use strict';
const Controller = require('egg').Controller;
const response = require('../extend/response');
const utils = require('../extend/utils');

class ReportController extends Controller {
  async reciveReport() {
    const { ctx } = this;
    console.log('ReportController state', ctx.state);


    response.sendSuccessWithoutContent(ctx);
  }
}


module.exports = ReportController;
