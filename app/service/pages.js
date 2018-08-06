/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-06 15:54:02
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-06 22:46:54
 */

'use strict';
const Service = require('egg').Service;
const generateErrorPromise = require('../extend/utils').generateErrorPromise;


class PagesService extends Service {
  /**
   * 分发数据操作时间
   *
   * @param {*} action 数据库操作Api
   * @param {*} options 配置
   * @return {Promise} 数据库操作后的Promise
   * @memberof UserService
   */
  dispatch(action, options) {
    if (action && options) {
      return this.app.mysql[action]('web_pages', options);
    }
    return generateErrorPromise('action options为null');
  }


  /**
   * 通过AppId查询该AppId下的所有网址情况
   *
   * @param {*} appId 应用Id
   * @return {Promise} 数据库操作后的Promise
   * @memberof PagesService
   */
  async queryAllPagesUrlByAppId(appId) {
    if (appId) {
      return this.app.mysql.query(
        `SELECT url,
        AVG(loadTime) AS loadTime,
        AVG(dnsTime) AS dnsTime,
        AVG(tcpTime) AS tcpTime,
        AVG(domTime) AS domTime,
        AVG(resourceTime) AS resourceTime,
        AVG(whiteTime) AS whiteTime,
        AVG(redirectTime) AS redirectTime,
        AVG(unloadTime) AS unloadTime,
        AVG(requestTime) AS requestTime,
        AVG(analysisDomTime) AS analysisDomTime,
        AVG(readyTime) AS readyTime,
        COUNT(url) AS count FROM web_pages WHERE systemId = ? GROUP BY url ORDER BY count DESC`,
        [ appId ]
      );
    }
    return generateErrorPromise();
  }

}


module.exports = PagesService;
