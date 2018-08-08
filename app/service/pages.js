/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-06 15:54:02
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-08 11:49:22
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
   * @param {*} start 起始位置
   * @param {*} limit 分页大小
   * @return {Promise} 数据库操作后的Promise
   * @memberof PagesService
   */
  async queryAllPagesUrlByAppId(appId, start, limit) {
    if (appId) {
      let sql = `SELECT url,
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
      COUNT(url) AS count FROM web_pages WHERE systemId = ? GROUP BY url ORDER BY count DESC`;
      const params = [ appId ];

      if (start !== undefined && limit !== undefined) {
        sql += ' LIMIT ?,?';
        params.push(Number(start), Number(limit));
      }

      return this.app.mysql.query(
        sql,
        params
      );
    }
    return generateErrorPromise();
  }

  /**
   * 通过url查询url的加载情况
   *
   * @param {*} url url地址
   * @param {number} [start=0] 起始位置
   * @param {number} [limit=10] 分页大小
   * @return  {Promise} 数据库操作后的Promise
   * @memberof PagesService
   */
  async queryPagesByUrl(url, start, limit) {
    if (url) {
      const params = {
        where: {
          url: decodeURIComponent(url),
        },
      };

      if (start !== undefined) params.start = Number(start);
      if (limit !== undefined) params.offset = Number(limit);

      return this.dispatch('select', params);
    }
    return generateErrorPromise();
  }


  /**
   * 根据Url，创建时间范围查询性能概况
   *
   * @param {*} url url地址
   * @param {*} startCreateTime 起始创建时间
   * @param {*} endCreateTime 结束创建时间
   * @return {Promise} 数据库操作后的Promise
   * @memberof PagesService
   */
  async queryPagesSimpleInfoByUrlAndTime(url, startCreateTime, endCreateTime) {
    if (url) {
      let sql = `SELECT
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
      COUNT(url) AS count FROM web_pages WHERE url=?`;
      const params = [ decodeURIComponent(url) ];
      if (startCreateTime) {
        sql += ` And createTime >= '${startCreateTime}'`;
        params.push(startCreateTime);
      }

      if (endCreateTime) {
        sql += ` And createTime <= '${endCreateTime}'`;
        params.push(endCreateTime);
      }

      return this.app.mysql.query(
        sql,
        params
      );
    }
    return generateErrorPromise();
  }
}


module.exports = PagesService;
