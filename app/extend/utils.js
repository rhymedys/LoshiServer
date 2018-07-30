/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-07-27 10:29:23
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-07-30 15:03:37
 */

'use strict';

/**
 * 生成错误的promise
 *
 * @param {string} [e='error']  错误信息
 * @return {Promise} Promise对象
 */
function generateErrorPromise(e = 'error') {
  return Promise.reject(new Error(e));
}

module.exports = {
  generateErrorPromise,
};
