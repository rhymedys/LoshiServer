/*
 * @Author: Rhymedys/Rhymedys@gmail.com 
 * @Date: 2018-08-16 16:41:41 
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-16 16:52:25
 */

const Controller = require('egg').Controller;
const utils = require('../extend/utils');

class RenderController extends Controller{
    async renderAdmin(){
        await this.ctx.render('index.ejs')
    }
}

module.exports =RenderController
