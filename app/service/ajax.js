/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-09 17:57:40
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-10 12:27:43
 */
'use strict';

const Service = require('egg').Service;
const generateErrorPromise = require('../extend/utils').generateErrorPromise;

class AjaxService extends Service {
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
      return this.app.mysql[action]('web_ajax', options);
    }
    return generateErrorPromise('action options为null');
  }

  /**
   * 通过Url查询列表
   *
   * @param {*} { callUrl, start, limit } callUrl 访问页面,start 其实索引,limit 分页大小
   * @return {Promise} 数据库操作后的Promise
   * @memberof AjaxService
   */
  async queryListGroupByNameByCallUrl({ callUrl, start, limit }) {
    if (callUrl) {
      let sql = `SELECT name,
      callUrl,
      AVG(duration) AS duration, 
      AVG(decodedBodySize) AS decodedBodySize 
      FROM web_ajax 
      WHERE callUrl =?  
      GROUP BY name `;

      const options = [ decodeURIComponent(callUrl) ];

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
   * 通过Url查询列表数量
   *
   * @param {*} {callUrl}  callUrl 访问页面
   * @return  {Promise} 数据库操作后的Promise
   * @memberof AjaxService
   */
  async queryListCountGroupByNameByCallUrl({ callUrl }) {
    if (callUrl) {
      const sql = `SELECT COUNT(1) AS count 
      FROM ( 
          SELECT COUNT(1) AS count 
          FROM web_ajax 
          WHERE callUrl = ?
          GROUP BY name 
      ) 
      p`;

      const options = [ decodeURIComponent(callUrl) ];

      return this.app.mysql.query(
        sql,
        options
      );
    }
    return generateErrorPromise();
  }

}

module.exports = AjaxService;
