/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-07-27 10:29:23
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-21 16:48:15
 */

'use strict';
const moment = require('moment');
function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val;
}

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
    return moment(strDate).format('YYYY-MM-DD HH:mm:ss');
  } catch (e) {
    return strDate;
  }
}

function getTimeDistance(type) {
  const now = new Date();
  const oneDay = 1000 * 60 * 60 * 24;

  if (type === 'today') {
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    return [ moment(now), moment(now.getTime() + (oneDay - 1000)) ];
  }

  if (type === 'week') {
    let day = now.getDay();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);

    if (day === 0) {
      day = 6;
    } else {
      day -= 1;
    }

    const beginTime = now.getTime() - day * oneDay;

    return [ moment(beginTime), moment(beginTime + (7 * oneDay - 1000)) ];
  }

  if (type === 'month') {
    const year = now.getFullYear();
    const month = now.getMonth();
    const nextDate = moment(now).add(1, 'months');
    const nextYear = nextDate.year();
    const nextMonth = nextDate.month();

    return [
      moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
      moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000),
    ];
  }

  if (type === 'year') {
    const year = now.getFullYear();

    return [ moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`) ];
  }
}

module.exports = {
  generateErrorPromise,
  formatDate2YYYYMMDDHHMMSS,
  getTimeDistance,
};
