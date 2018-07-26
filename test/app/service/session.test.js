/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-07-26 11:04:17
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-07-26 11:17:25
 */

'use strict';

const { app } = require('egg-mock/bootstrap');

describe('service/session.js', () => {
  it('session *insert* success', () => {
    app.mockService('session', 'insert', () => {
      return Promise.resolve({
        _id: '5b56e3ffb9a9e60c844e45b7',
        openId: 'oVU_q0Hb_u_vQOB0U8mRpadl_AKc',
        JSESSIONID: 'OBYmIx2LU0zAfLElrYfhcQ==',
        expires: 1532579500036.0,
        __v: 0,
      });
    });
  });

});
