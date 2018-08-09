/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-09 19:31:21
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-09 20:23:11
 */

'use strict';

const Service = require('egg').Service;
const generateErrorPromise = require('../extend/utils').generateErrorPromise;

const queryCol = [
  'systemId',
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
   * 查询列表
   *
   * @param {*} { callUrl, start, limit } callUrl 访问页面,start 其实索引,limit 分页大小
   * @return  {Promise} 数据库操作后的Promise
   * @memberof ResourceService
   */
  async queryList({ callUrl, start, limit }) {
    if (callUrl) {
      const options = {
        where: {
          callUrl: decodeURIComponent(callUrl),
        },
        columns: queryCol,
        orders: [[ 'createTime', 'desc' ]],
      };

      if (start !== undefined && limit !== undefined) {
        options.offset = Number(start);
        options.limit = Number(limit);
      }

      return this.dispatch('select', options);
    }

    return generateErrorPromise();
  }


}

module.exports = SlowResourceService;
