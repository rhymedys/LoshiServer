/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-07 10:11:11
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-14 09:25:42
 */
'use strict';
const Service = require('egg').Service;
const generateErrorPromise = require('../extend/utils').generateErrorPromise;

class EnvironmentService extends Service {
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
      return this.app.mysql[action]('web_environment', options);
    }
    return generateErrorPromise('action options为null');
  }


  /**
   * 查询当前url访问的环境配置
   *
   * @param {*} url url地址
   * @param {*} type 类型
   * @return {Promise} 数据库操作后的Promise
   * @memberof PagesService
   */
  async queryUrlEnvironmentByType({ url, startDate, endDate, type }) {
    if (url && type) {
      const param = [ decodeURIComponent(url) ];
      let sql = '';
      if (Number(type) === 1) {
        // 浏览器类型
        sql = `SELECT browser ,
        borwserVersion ,
        COUNT(*) as count
        FROM web_environment
        WHERE url=? <--otherConidition--> GROUP BY browser,borwserVersion ORDER BY count DESC `;
      } else if (Number(type) === 2) {
        // 系统类型
        sql = `SELECT system ,
        systemVersion ,
        COUNT(*) as count
        FROM web_environment
        WHERE url=? <--otherConidition--> GROUP BY system,systemVersion ORDER BY count DESC `;
      } else {
        // 城市类型
        sql = `SELECT city ,
        COUNT(*) as count 
        FROM web_environment
        WHERE url=? <--otherConidition--> GROUP BY city ORDER BY count DESC `;
      }


      sql = sql.replace('<--otherConidition-->', function() {
        let res = '';
        if (startDate !== undefined) {
          param.push(startDate);
          res += 'AND createTime >= ? ';

        }

        if (endDate !== undefined) {
          res += 'AND createTime <=  ? ';
          param.push(endDate);
        }

        return res;
      });

      return this.app.mysql.query(
        sql,
        param
      );
    }
    return generateErrorPromise();
  }
}

module.exports = EnvironmentService;
