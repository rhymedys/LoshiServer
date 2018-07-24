/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-07-24 16:16:48
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-07-24 17:01:04
 */
'use strict';
const Service = require('egg').Service;

class SessionService extends Service {
  async insert(sessionObj) {
    if (sessionObj) {
      return this.ctx.model.Session
        .create(sessionObj);
    }
    return Promise.reject(new Error('sessionObj 为空'));

  }
}

module.exports = SessionService;
