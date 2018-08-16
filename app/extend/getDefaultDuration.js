/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-16 19:46:50
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-16 19:47:18
 */

'use strict';
const utils = require('./utils');


module.exports = function() {
  return {
    startDate: utils.getTimeDistance('month')[0].format('YYYY-MM-DD HH:mm:ss'),
    endDate: utils.getTimeDistance('month')[1].format('YYYY-MM-DD HH:mm:ss'),
  };
};
