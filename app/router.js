/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-07-24 11:16:52
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-01 10:52:31
 */

'use strict';


/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const checkSession = middleware.checkSession(null, app);
  const checkIsLogin = middleware.checkToken();
  router.get('/', controller.home.index);
  router.get('/loshi/login', controller.checkWXMiniProgramLogin.login);
  router.get('/loshi/a', checkSession);
  router.post('/loshi/api/login', controller.login.login);
  router.post('/loshi/api/system/create', checkIsLogin, controller.system.create);
  router.get('/loshi/api/system/delete', checkIsLogin, controller.system.delete);
  router.post('/loshi/api/system/update', checkIsLogin, controller.system.update);
};
