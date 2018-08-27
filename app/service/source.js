/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-09 19:31:21
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-27 16:33:09
 */

'use strict';

const Service = require('egg').Service;
const generateErrorPromise = require('../extend/utils').generateErrorPromise;

class SourceService extends Service {
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
      return this.app.mysql[action]('web_sources', options);
    }
    return generateErrorPromise('action options为null');
  }

  /**
   * 插入数据
   *
   * @param {*} obj 要插入的数据
   * @return  {Promise} 数据库操作后的Promise
   * @memberof SlowPagesService
   */
  async insert(obj) {
    if (obj) {
      return this.dispatch('insert', obj);
    }

    return generateErrorPromise('SourceService insert 数据为空');
  }


}

module.exports = SourceService;
