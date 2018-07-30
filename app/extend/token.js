/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-07-30 13:40:41
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-07-30 14:03:49
 */

'use strict';

const tokenKey = 'loshilt';


/**
 * 从Cookies中获取token
 *
 * @param {*} ctx app对象
 * @return {*} 返回值
 */
function getTokenFromCookies(ctx) {
  return ctx && ctx.cookies.get(tokenKey);
}


/**
 * 设置token在Cookies
 *
 * @param {*} ctx app对象
 * @param {*} token token值
 * @return {*} 返回值
 */
function setTokenToCookies(ctx, token) {
  return ctx && token && ctx.cookies.set(tokenKey, token);
}


/**
 * 在DB中存放Token信息
 *
 * @param {*} ctx app对象
 * @param {*} tokenObj token信息
 * @return {Promise} promise 对象
 */
async function setTokenToDBByUserName(ctx, tokenObj) {
  return ctx && ctx.service.token.insert(tokenObj);
}


/**
 * 从数据库获取token信息
 *
 * @param {*} ctx app对象
 * @param {*} token token
 * @return {Promise} promise 对象
 */
async function getDBTokenInfoByToken(ctx, token) {
  return ctx && token && ctx.service.token.findByToken(token);
}


/**
 * 通过cookies中的tokenId获取token信息
 *
 * @param {*} ctx app对象
 * @return {Promise} promise 对象
 */
async function getDBTokenInfoByCookiesToken(ctx) {
  return ctx && getTokenFromCookies(ctx) && ctx.service.token.findByToken(getTokenFromCookies(ctx));
}

module.exports = {
  getTokenFromCookies,
  setTokenToCookies,
  setTokenToDBByUserName,
  getDBTokenInfoByToken,
  getDBTokenInfoByCookiesToken,
};
