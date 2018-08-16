/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-14 14:13:20
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-16 17:33:39
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
        WHERE appId = ? 
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
        WHERE appId = ? 
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


  /**
   * 根据url，category获取错误列表
   *
   * @param {*} { url, startDate, endDate, category, start, limit } 查询参数
   * @return {Promise} 数据库操作后的Promise
   * @memberof ErrorService
   */
  async getItemList({ url, startDate, endDate, category, start, limit }) {
    if (url && [ 'ajax', 'js', 'resource' ].find(val => val === category)) {
      let sql = '';
      const params = [ decodeURIComponent(url), category ];
      switch (category) {
        case 'js':
          sql = 'SELECT id,msg,category,createTime,pageUrl,resourceUrl,line,col,method ';
          break;
        case 'ajax':
          sql = 'SELECT id,msg,category,createTime,pageUrl,resourceUrl,text,status,querydata,method ';
          break;
        case 'resource':
          sql = 'id,msg,category,createTime,pageUrl,resourceUrl,target,type,querydata,method ';
          break;
        default:break;
      }

      sql += ' FROM web_error WHERE resourceUrl = ? AND category = ? ';


      if (startDate) {
        sql += ' AND createTime >= ? ';
        params.push(startDate);
      }

      if (endDate) {
        sql += ' AND createTime <= ? ';
        params.push(endDate);
      }

      if (start !== undefined && limit !== undefined) {
        sql += ' LIMIT ?,? ';
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
   * 根据url，category获取错误列表数量
   *
   * @param {*} { url, startDate, endDate, category } 查询参数
   * @return {Promise} 数据库操作后的Promise
   * @memberof ErrorService
   */
  async getItemListCount({ url, startDate, endDate, category }) {
    if (url && category) {
      let sql = `SELECT COUNT(1) as count 
      FROM web_error 
      WHERE resourceUrl = ? 
      AND category = ? `;
      const params = [ decodeURIComponent(url), category ];

      if (startDate) {
        sql += ' AND createTime >= ? ';
        params.push(startDate);
      }

      if (endDate) {
        sql += ' AND createTime <= ? ';
        params.push(endDate);
      }

      return this.app.mysql.query(
        sql,
        params
      );
    }

    return generateErrorPromise();
  }


  /**
   * 获取错误详情信息
   *
   * @param {*} { id } id
   * @return {Promise} 数据库操作后的Promise
   * @memberof ErrorService
   */
  async getErrorDetail({ id }) {
    if (id) {
      return this.dispatch('get', {
        id: Number(id),
      });
    }
    return generateErrorPromise();
  }

}

module.exports = ErrorService;
