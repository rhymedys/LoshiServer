/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-07-24 11:16:52
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-06 22:44:00
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

  // ----------------------------login--------------------------------------
  router.get('/loshi/login', controller.checkWXMiniProgramLogin.login);
  router.post('/loshi/api/login', controller.login.login);

  // ----------------------------user--------------------------------------
  router.get('/loshi/api/user/query', checkIsLogin, controller.user.query);

  // ----------------------------system--------------------------------------
  router.post('/loshi/api/system/create', checkIsLogin, controller.system.create);
  router.get('/loshi/api/system/delete', checkIsLogin, controller.system.delete);
  router.get('/loshi/api/system/queryByCurrentUser', checkIsLogin, controller.system.queryByCurrentUser);
  router.get('/loshi/api/system/queryByAppId', checkIsLogin, controller.system.queryByAppId);
  router.post('/loshi/api/system/update', checkIsLogin, controller.system.update);

  // ----------------------------pages--------------------------------------
  router.get('/loshi/api/pages/queryAllPagesUrlByAppId', checkIsLogin, controller.pages.queryAllPagesUrlByAppId);

};
