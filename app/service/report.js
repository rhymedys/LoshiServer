/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-15 15:32:29
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-27 16:28:20
 */

'use strict';
const Service = require('egg').Service;
const generateErrorPromise = require('../extend/utils').generateErrorPromise;

class ReportService extends Service {

  async insertError(errObjOrErrlist) {
    if ([ '[object Array]', '[object Object]' ].indexOf(Object.prototype.toString
      .call(errObjOrErrlist)) >= 0) {
      return this.app.mysql.beginTransactionScope(async conn => {
        // don't commit or rollback by yourself
        const res = {
          success: true,
        };
        await conn
          .insert('web_error', errObjOrErrlist)
          .catch(e => {
            this.logger.error(e);
            res.success = false;
          });

        return res;
      }, this.ctx);
    }

    return generateErrorPromise('ReportService insertError 类型不符');
  }
}

module.exports = ReportService;
