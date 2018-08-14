/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-14 14:13:20
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-14 16:26:45
 */

'use strict';
const Service = require('egg').Service;
const generateErrorPromise = require('../extend/utils').generateErrorPromise;

class ErrorService extends Service {
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
      return this.app.mysql[action]('web_error', options);
    }
    return generateErrorPromise('action options为null');
  }


  /**
   * 获取错误列表
   *
   * @param {*} { appId, startDate, endDate, start, limit } 参数
   * @return {Promise} 数据库操作后的Promise
   * @memberof ErrorService
   */
  async getList({ appId, startDate, endDate, start, limit, category }) {
    if (appId) {
      let sql = `SELECT resourceUrl, category, count( resourceUrl ) AS count 
        FROM web_error 
        WHERE systemId = ? 
        <--otherConidition-->
        GROUP BY resourceUrl, category `;
      const params = [ appId ];

      sql = sql.replace('<--otherConidition-->', function() {
        let res = '';
        if (startDate) {
          res += ' AND createTime >= ? ';
          params.push(startDate);
        }

        if (endDate) {
          res += ' AND createTime <= ? ';
          params.push(endDate);
        }

        if (category) {
          res += ' AND category = ? ';
          params.push(category);
        }

        return res;
      });

      if (start !== undefined && limit !== undefined) {
        sql += 'LIMIT ?,?';
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
   * 获取错误列表数量
   *
   * @param {*} { appId, startDate, endDate, start, limit } 参数
   * @return {Promise} 数据库操作后的Promise
   * @memberof ErrorService
   */
  async getListCount({ appId, startDate, endDate, category }) {
    if (appId) {
      let sql = `SELECT COUNT(1) AS count 
      FROM (
        SELECT resourceUrl, category, count( resourceUrl ) AS count 
        FROM web_error 
        WHERE systemId = ? 
        <--otherConidition-->
        GROUP BY resourceUrl,category
      )p`;
      const params = [ appId ];

      sql = sql.replace('<--otherConidition-->', function() {
        let res = '';
        if (startDate) {
          res += ' AND createTime >= ? ';
          params.push(startDate);
        }

        if (endDate) {
          res += ' AND createTime <= ? ';
          params.push(endDate);
        }

        if (category) {
          res += ' AND category = ? ';
          params.push(category);
        }

        return res;
      });

      return this.app.mysql.query(
        sql,
        params
      );
    }

    return generateErrorPromise();
  }

}

module.exports = ErrorService;
