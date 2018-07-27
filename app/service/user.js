/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-07-27 10:12:12
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-07-27 11:14:32
 */

'use strict';
const Service = require('egg').Service;
const generateErrorPromise = require('../extend/utils').generateErrorPromise;

class UserService extends Service {


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
      return this.app.mysql[action]('web_user', options);
    }
    return generateErrorPromise('action options为null');
  }


  /**
   * 通过帐户名查看账户信息
   *
   * @param {*} userName 账户名称
   * @return {Promise} 数据库操作后的Promise
   * @memberof UserService
   */
  async findByUserName(userName) {
    if (userName) {
      return await this.dispatch('get', { userName });
    }
    return generateErrorPromise('userName为null');
  }


  /**
   *创建用户
   *
   * @param {*} userInfo 用户信息
   * @return {Promise} 数据库操作后的Promise
   * @memberof UserService
   */
  async createUser(userInfo) {
    if (userInfo && userInfo.userName) {
      if (this.findByUserName(userInfo.userName)) {
        return generateErrorPromise('当前用户已存在');
      }
      return this.dispatch('insert', userInfo);
    }
    return generateErrorPromise('userInfo为null');
  }
}

module.exports = UserService;
