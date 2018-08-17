'use strict';
const Controller = require('egg').Controller;
const moment = require('moment');
const { URL } = require('url');
const response = require('../extend/response');
const utils = require('../extend/utils');


class ReportController extends Controller {
  async reciveReport() {
    const { ctx } = this;
    console.log('ReportController state', ctx.state);
    const { addData, appVersion, errorList, page, performance, preUrl, resourceList, time } = ctx.request.body;
    const { systemInfo } = ctx.state;
    // 统计错误
    if (!systemInfo.isStatisiError) {
      const toInsertErrorList = errorList.map(errObj => {
        let { resourceUrl } = errObj.data;
        let resourceUrlQuery = '';
        try {
          const resourceUrl2URLObj = new URL(resourceUrl);
          if (resourceUrl2URLObj) {
            resourceUrl = resourceUrl2URLObj.href;
            resourceUrlQuery = resourceUrl2URLObj.search.replace('?', '');
          }
        } catch (e) {
          this.logger.error(e);
        }

        return {
          useragent: appVersion || '',
          msg: errObj.msg || '',
          category: errObj.n || '',
          pageUrl: page || '',
          resourceUrl,
          querydata: resourceUrlQuery,
          target: errObj.data.target || '',
          type: errObj.data.type || '',
          status: errObj.data.status || '',
          text: errObj.data.text || '',
          col: errObj.data.col || '',
          line: errObj.data.line || '',
          method: errObj.method,
          fullurl: errObj.data.resourceUrl,
          createTime: moment(new Date(errObj.t)).format('YYYY-MM-DD HH:mm:ss'),
          appId: addData.appId,
        };
      });

      await this.service.report
        .insertError(toInsertErrorList)
        .catch(e => {
          this.logger.error(e);
          response.sendSuccessWithoutContent(ctx);
        });
    }

    response.sendSuccessWithoutContent(ctx);
  }
}


module.exports = ReportController;
