/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-07-27 10:29:23
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-09 17:37:27
 */

'use strict';
const moment = require('moment');

/**
 * 生成错误的promise
 *
 * @param {string} [e='error']  错误信息
 * @return {Promise} Promise对象
 */
function generateErrorPromise(e = 'error') {
  return Promise.reject(new Error(e));
}


/**
 * 格式化日期
 *
 * @param {*} strDate 要格式化的日期
 * @return {string} 格式化后的日期
 */
function formatDate2YYYYMMDDHHMMSS(strDate) {
  try {
    return moment(strDate).format('YYYY-MM-DD hh:mm:ss');
  } catch (e) {
    return strDate;
  }
}

module.exports = {
  generateErrorPromise,
  formatDate2YYYYMMDDHHMMSS,
};
