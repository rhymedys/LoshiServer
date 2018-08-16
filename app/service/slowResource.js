/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-09 19:31:21
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-16 17:39:59
 */

'use strict';

const Service = require('egg').Service;
const generateErrorPromise = require('../extend/utils').generateErrorPromise;

const queryCol = [
  'appId',
  'name',
  'method',
  'duration',
  'decodedBodySize',
  'createTime',
  'callUrl',
  'markUser',
  'markPage',
  'querydata',
];

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
  async queryListByCallUrl({ callUrl, start, limit }) {
    if (callUrl) {
      let sql = `SELECT name,
      duration,
      decodedBodySize,
      createTime,
      callUrl 
      FROM web_slowresources
      WHERE callUrl = ? `;

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
   * 通过URL查询列表数量
   *
   * @param {*} { callUrl } callUrl 访问页面
   * @return {Promise} 数据库操作后的Promise
   * @memberof SlowResourceService
   */
  async queryListCountByCallUrl({ callUrl }) {
    if (callUrl) {
      const sql = `SELECT COUNT(1) as count
      FROM web_slowresources
      WHERE callUrl = ? `;

      const options = [ decodeURIComponent(callUrl) ];

      return this.app.mysql.query(
        sql,
        options
      );
    }

    return generateErrorPromise();
  }


}

module.exports = SlowResourceService;
