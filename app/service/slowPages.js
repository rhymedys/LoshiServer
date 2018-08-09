/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-09 19:31:21
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-09 20:26:07
 */

'use strict';

const Service = require('egg').Service;
const generateErrorPromise = require('../extend/utils').generateErrorPromise;

class SlowPagesService extends Service {
  /**
   * 分发数据操作时间
   *
   * @param {*} action 数据库操作Api
   * @param {*} options 配置
   * @return {Promise} 数据库操作后的Promise
   * @memberof SlowPagesService
   */
  dispatch(action, options) {
    if (action && options) {
      return this.app.mysql[action]('web_slowpages', options);
    }
    return generateErrorPromise('action options为null');
  }


  /**
   * 查询列表
   *
   * @param {*} { url, start, limit } url 访问域名 ,start 其实索引,limit 分页大小
   * @return  {Promise} 数据库操作后的Promise
   * @memberof ResourceService
   */
  async queryList({ url, start, limit }) {
    if (url) {
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
      COUNT(url) AS count 
      FROM web_slowpages 
      WHERE url = ? 
      GROUP BY url 
      ORDER BY count DESC `;
      const options = [ decodeURIComponent(url) ];

      if (start !== undefined && limit !== undefined) {
        sql += 'LIMIT ?,?';
        options.push(Number(start), Number(limit));
      }

      return this.app.mysql.query(
        sql,
        options
      );
    }

    return generateErrorPromise();
  }


}

module.exports = SlowPagesService;
