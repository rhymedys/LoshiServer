'use strict';
const Controller = require('egg').Controller;
const { URL } = require('url');
const response = require('../extend/response');
const utils = require('../extend/utils');
const isArray = require('lodash/fp/isArray');

class ReportController extends Controller {
  async reciveReport() {

    const { ctx } = this;
    // console.log('ReportController state', ctx.state);
    const { addData, appVersion, errorList, page, performance, preUrl, resourceList, time, appId } = ctx.request.body;
    const { systemInfo } = ctx.state;
    const actions = [];

    // 统计错误
    if (!systemInfo.isStatisiError && isArray(errorList) && errorList.length) {
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
          resourceUrl: resourceUrl || page,
          querydata: errObj.method.toUpperCase() === 'POST' ? JSON.stringify(errObj.data.payload) : resourceUrlQuery,
          target: errObj.data.target || '',
          type: errObj.data.type || '',
          status: errObj.data.status || '',
          text: errObj.data.text || '',
          col: errObj.data.col || '',
          line: errObj.data.line || '',
          method: errObj.method,
          fullurl: errObj.data.resourceUrl || page,
          createTime: utils.formatDate2YYYYMMDDHHMMSS(new Date(errObj.t)),
          appId,
        };
      });


      actions.push(this.service.report.insertError(toInsertErrorList));

      // .catch(e => {
      //   this.logger.error(e);
      //   response.sendSuccessWithoutContent(ctx);
      // });
    }

    // 存储页面page性能
    if (!systemInfo.isStatisiPages && performance) {
      const data = {
        loadTime: performance.lodt || 0,
        dnsTime: performance.dnst || 0,
        tcpTime: performance.tcpt || 0,
        domTime: performance.domt || 0,
        whiteTime: performance.wit || 0,
        redirectTime: performance.rdit || 0,
        unloadTime: performance.uodt || 0,
        requestTime: performance.reqt || 0,
        analysisDomTime: performance.andt || 0,
        readyTime: performance.radt || 0,
        resourceTime: performance.resourceTime || 0, // 暂时未接入
        preUrl,
        url: decodeURIComponent(page),
        // markUser: performance.markUser,
        // markPage: performance.markPage,
        createTime: utils.formatDate2YYYYMMDDHHMMSS(time),
        appId,
      };


      if (data.loadTime + data.resourceTime >= systemInfo.slowPageTime * 1000) {
        actions.push(this.service.slowPages.insert(data));
      } else {
        actions.push(this.service.pages.insert(data));
      }
    }


    if (isArray(resourceList)) {
      const item = {
        appId,
        // markPage:resourceDatas.markPage,
        // markUser:resourceDatas.markUser,
        callUrl: decodeURIComponent(page),
        createTime: utils.formatDate2YYYYMMDDHHMMSS(time),

      };
      resourceList.forEach(val => {
        let slowDuration = 0;
        let table = '';
        const commitItem = Object.assign({}, item, {
          name: val.name,
          decodedBodySize: val.decodedBodySize,
          method: val.method,
          duration: val.duration,
        });

        if (val.type === 'script') {
          slowDuration = systemInfo.slowJsTime;
        } else if (val.type === 'link' || val.type === 'css') {
          slowDuration = systemInfo.slowCssTime;
        } else if (val.type === 'xmlhttprequest') {
          try {
            const newurl = new URL(val.name);
            const newName = newurl.href;
            const querydata = newurl.search.replace('?', '');
            commitItem.name = newName;
            commitItem.querydata = val.method.toUpperCase() === 'POST' ? JSON.stringify(val.payload) : querydata;
          } catch (e) {
            this.logger.error(e);
          }
          slowDuration = systemInfo.slowAajxTime;
          // let newurl      = url.parse(val.name)
          // let newName     = newurl.protocol+'//'+newurl.host+newurl.pathname
          // let querydata   = newurl.query?querystring.parse(newurl.query):{}

          // items.querydata = JSON.stringify(querydata)
          // items.name      = newName
          // item.querydata  = querydata
          // item.name       = newName

          // duration = systemItem.slowAajxTime
          table = 'web_ajax';

        } else if (val.type === 'img') {
          slowDuration = systemInfo.slowImgTime;
        }

        if (parseInt(val.duration) >= slowDuration * 1000) {
          table = 'web_slowresources';
        }

        if (table && table === 'web_ajax' && systemInfo.isStatisiAjax === 0) {
          actions.push(this.service.ajax.insert(commitItem));

        } else if (table && table === 'web_slowresources' && systemInfo.isStatisiResource === 0) {
          actions.push(this.service.slowResource.insert(commitItem));
        }
      });


      // 存储页面所有资源
      if (systemInfo.isStatisiResource === 0) {
        const commitItem = Object.assign({}, item, {
          resourceDatas: JSON.stringify(resourceList),
        });
        actions.push(this.service.source.insert(commitItem));
      }
    }
    Promise.all(actions)
      .catch(e => {
        this.logger.error(e);
        response.sendSuccessWithoutContent(ctx);
      });


    response.sendSuccessWithoutContent(ctx);
  }
}


module.exports = ReportController;
