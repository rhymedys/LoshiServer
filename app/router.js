/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-07-24 11:16:52
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-21 10:59:35
 */

'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  // const checkSession = middleware.checkSession(null, app);
  const checkTokenIsLogin = middleware.checkToken();
  const checkIsLogin = middleware.checkIsLogin();
  const checkCanReport = middleware.checkCanReport();
  router.get('/', controller.home.index);

  // ----------------------------login--------------------------------------
  router.get('/loshi/login', controller.checkWXMiniProgramLogin.login);
  router.post('/loshi/api/login', controller.login.login);
  router.get('/loshi/api/logout', checkTokenIsLogin, controller.login.logout);

  // ----------------------------user--------------------------------------
  router.get('/loshi/api/user/query', checkTokenIsLogin, controller.user.query);

  // ----------------------------system--------------------------------------
  router.post('/loshi/api/system/create', checkTokenIsLogin, controller.system.create);
  router.get('/loshi/api/system/delete', checkTokenIsLogin, controller.system.delete);
  router.get('/loshi/api/system/queryByCurrentUser', checkTokenIsLogin, controller.system.queryByCurrentUser);
  router.get('/loshi/api/system/queryByAppId', checkTokenIsLogin, controller.system.queryByAppId);
  router.post('/loshi/api/system/update', checkTokenIsLogin, controller.system.update);

  // ----------------------------pages--------------------------------------
  router.get('/loshi/api/pages/queryAllPagesUrlByAppId', checkTokenIsLogin, controller.pages.queryAllPagesUrlByAppId);
  router.get('/loshi/api/pages/queryAllPagesUrlCountByAppId', checkTokenIsLogin, controller.pages.queryAllPagesUrlCountByAppId);
  router.get('/loshi/api/pages/queryPagesByUrl', checkTokenIsLogin, controller.pages.queryPagesByUrl);
  router.get('/loshi/api/pages/queryPagesCountByUrl', checkTokenIsLogin, controller.pages.queryPagesCountByUrl);
  router.get('/loshi/api/pages/queryPagesSimpleInfoByUrlAndTime', checkTokenIsLogin, controller.pages.queryPagesSimpleInfoByUrlAndTime);

  // ----------------------------environment--------------------------------------
  router.get('/loshi/api/environment/queryUrlEnvironmentByType', checkTokenIsLogin, controller.environment.queryUrlEnvironmentByType);

  // ----------------------------ajax--------------------------------------
  router.get('/loshi/api/ajax/queryListGroupByNameByCallUrl', checkTokenIsLogin, controller.ajax.queryListGroupByNameByCallUrl);
  router.get('/loshi/api/ajax/queryListCountGroupByNameByCallUrl', checkTokenIsLogin, controller.ajax.queryListCountGroupByNameByCallUrl);

  // ----------------------------slowResource--------------------------------------
  router.get('/loshi/api/slowResource/queryListByCallUrl', checkTokenIsLogin, controller.slowResource.queryListByCallUrl);
  router.get('/loshi/api/slowResource/queryListCountByCallUrl', checkTokenIsLogin, controller.slowResource.queryListCountByCallUrl);

  // ----------------------------slowPages--------------------------------------
  router.get('/loshi/api/slowPages/querListByUrl', checkTokenIsLogin, controller.slowPages.querListByUrl);
  router.get('/loshi/api/slowPages/querListCountByUrl', checkTokenIsLogin, controller.slowPages.querListCountByUrl);

  // ----------------------------error--------------------------------------
  router.get('/loshi/api/error/getList', checkTokenIsLogin, controller.error.getList);
  router.get('/loshi/api/error/getListCount', checkTokenIsLogin, controller.error.getListCount);
  router.get('/loshi/api/error/getItemList', checkTokenIsLogin, controller.error.getItemList);
  router.get('/loshi/api/error/getItemListCount', checkTokenIsLogin, controller.error.getItemListCount);
  router.get('/loshi/api/error/getErrorDetail', checkTokenIsLogin, controller.error.getErrorDetail);


  router.post('/loshi/api/report', checkCanReport, controller.report.reciveReport);

  // 管理后台
  router.get('/admin/*', checkIsLogin, controller.render.renderAdmin);
  router.get('/test', controller.render.renderTestDemo);
};
