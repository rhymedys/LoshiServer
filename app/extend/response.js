/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-07-26 10:27:52
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-16 14:09:00
 */

'use strict';


/**
 * 成功没有返回内容
 *
 * @param {*} ctx app对象
 */
function sendSuccessWithoutContent(ctx) {
  if (ctx !== undefined) {
    ctx.status = 200;
    ctx.body = null;
  }
}

/**
 *
 * @param {*} ctx app对象
 * @param {*} data 数据
 * @param {*} resultDesc 描述
 */
function sendSuccess(ctx, data, resultDesc) {
  send(ctx, data, 0, resultDesc || 'success');
}

/**
   *
   * @param {*} ctx app对象
   * @param {*} resultDesc 描述
   */
function sendFail(ctx, resultDesc) {
  send(ctx, null, -1, resultDesc || 'error');
}

/**
   *
   * @param {*} ctx app对象
   * @param {*} data 数据
   * @param {*} resultCode 状态码
   * @param {*} resultDesc 描述
   */
function send(ctx, data, resultCode, resultDesc) {
  if (ctx && resultCode !== undefined) {
    ctx.status = 200;
    ctx.type = 'application/json; charset=UTF-8';
    ctx.body = Object.assign({
      resultCode,
      resultDesc: resultDesc ? resultDesc : '',
    }, data !== undefined && data !== null ? { data } : null);
  }
}

module.exports = {
  sendSuccess,
  sendFail,
  send,
  sendSuccessWithoutContent,
};

