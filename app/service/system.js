/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-07-30 14:12:13
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-07-30 15:39:53
 */

'use strict';
const Service = require('egg').Service;
const generateErrorPromise = require('../extend/utils').generateErrorPromise;

// 不能为空的字段
const notNullObj = [
  'systemDomain',
  'systemName',
  'isUse',
  'slowPageTime',
  'slowJsTime',
  'slowCssTime',
  'slowImgTime',
  'slowAajxTime',
  'appId',
  'userId',
  'isStatisiPages',
  'isStatisiAjax',
  'isStatisiResource',
  'isStatisiSystem',
  'isStatisiError',
];

class SystemService extends Service {
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
      return this.app.mysql[action]('web_system', options);
    }
    return generateErrorPromise('action options为null');
  }


  /**
   * 校验数据提交是否符合要求
   *
   * @param {*} systemObj system对象
   * @return {Boolean} 是否符合要求
   * @memberof SystemService
   */
  checkObjIsPermit(systemObj) {
    if (!systemObj) return false;

    return !notNullObj.find(val => [ '[object Undefined]', '[object Null]' ].includes(Object.prototype.toString.call(systemObj[val])));
  }


  /**
   * 新增应用
   *
   * @param {*} systemObj 应用对象
   * @return {Promise} promise对象
   * @memberof SystemService
   */
  async insert(systemObj) {
    if (this.checkObjIsPermit(systemObj)) {
      return this.dispatch('insert', systemObj);
    }
    return generateErrorPromise();
  }


  /**
   * 通过AppId 删除应用
   *
   * @param {*} appId 应用Id
   * @return {Promise} promise对象
   * @memberof SystemService
   */
  async deleteByAppId(appId) {
    if (appId) {
      return this.dispatch('delete', {
        appId,
      });
    }
    return generateErrorPromise();
  }


  /**
   * 根据AppId 更新应用信息
   *
   * @param {*} systemObj 应用对象
   * @return {Promise} promise对象
   * @memberof SystemService
   */
  async updateByAppId(systemObj) {
    if (this.checkObjIsPermit(systemObj)) {
      return this.dispatch('update', systemObj);
    }
    return generateErrorPromise();
  }


  /**
   * 通过AppId 查询应用信息
   *
   * @param {*} appId 应用Id
   * @return {Promise} promise对象
   * @memberof SystemService
   */
  async queryByAppId(appId) {
    if (appId) {
      return this.dispatch('get', {
        appId,
      });
    }
    return generateErrorPromise();
  }
}

module.exports = SystemService;
