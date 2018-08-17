/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-09 19:31:21
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-17 11:36:30
 */

'use strict';

const Service = require('egg').Service;
const generateErrorPromise = require('../extend/utils').generateErrorPromise;

class SlowResourceService extends Service {
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
      return this.app.mysql[action]('web_slowresources', options);
    }
    return generateErrorPromise('action options为null');
  }


  /**
   * 通过URL查询列表
   *
   * @param {*} { callUrl, start, limit } callUrl 访问页面,start 其实索引,limit 分页大小
   * @return  {Promise} 数据库操作后的Promise
   * @memberof ResourceService
   */
  async queryListByCallUrl({ callUrl, start, limit, startDate, endDate }) {
    if (callUrl) {
      let sql = `SELECT name,
      duration,
      decodedBodySize,
      createTime,
      callUrl 
      FROM web_slowresources
      WHERE callUrl = ? `;

      const options = [ decodeURIComponent(callUrl) ];

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
   * 通过URL查询列表数量
   *
   * @param {*} { callUrl } callUrl 访问页面
   * @return {Promise} 数据库操作后的Promise
   * @memberof SlowResourceService
   */
  async queryListCountByCallUrl({ callUrl, startDate, endDate }) {
    if (callUrl) {
      let sql = `SELECT COUNT(1) as count
      FROM web_slowresources
      WHERE callUrl = ? `;

      const options = [ decodeURIComponent(callUrl) ];

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

module.exports = SlowResourceService;
