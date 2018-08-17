/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-09 19:31:21
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-17 11:31:46
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
   * 通过url查询列表
   *
   * @param {*} { url, start, limit } url 访问域名 ,start 其实索引,limit 分页大小
   * @return  {Promise} 数据库操作后的Promise
   * @memberof ResourceService
   */
  async querListByUrl({ url, start, limit, startDate, endDate }) {
    if (url) {
      let sql = `SELECT id,
      url,
      loadTime,
      domTime,
      resourceTime,
      whiteTime,
      analysisDomTime,
      readyTime,
      createTime
      FROM web_slowpages
      WHERE url = ? `;

      const options = [ decodeURIComponent(url) ];


      if (startDate) {
        sql += ' And createTime >= ? ';
        options.push(startDate);
      }

      if (endDate) {
        sql += ' And createTime <= ? ';
        options.push(endDate);
      }

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

  /**
   * 通过url查询列表数量
   *
   * @param {*} { url, start, limit } url 访问域名 ,start 其实索引,limit 分页大小
   * @return  {Promise} 数据库操作后的Promise
   * @memberof ResourceService
   */
  async querListCountByUrl({ url, startDate, endDate }) {
    if (url) {
      let sql = `SELECT COUNT(1) AS count 
        FROM web_slowpages 
        WHERE url = ? 
        GROUP BY url
      `;
      const options = [ decodeURIComponent(url) ];

      if (startDate) {
        sql += ' And createTime >= ? ';
        options.push(startDate);
      }

      if (endDate) {
        sql += ' And createTime <= ? ';
        options.push(endDate);
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
