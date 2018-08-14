/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-07-24 11:16:52
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-14 14:42:01
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
  router.get('/loshi/api/pages/queryAllPagesUrlCountByAppId', checkIsLogin, controller.pages.queryAllPagesUrlCountByAppId);
  router.get('/loshi/api/pages/queryPagesByUrl', checkIsLogin, controller.pages.queryPagesByUrl);
  router.get('/loshi/api/pages/queryPagesCountByUrl', checkIsLogin, controller.pages.queryPagesCountByUrl);
  router.get('/loshi/api/pages/queryPagesSimpleInfoByUrlAndTime', checkIsLogin, controller.pages.queryPagesSimpleInfoByUrlAndTime);

  // ----------------------------environment--------------------------------------
  router.get('/loshi/api/environment/queryUrlEnvironmentByType', checkIsLogin, controller.environment.queryUrlEnvironmentByType);

  // ----------------------------ajax--------------------------------------
  router.get('/loshi/api/ajax/queryListGroupByNameByCallUrl', checkIsLogin, controller.ajax.queryListGroupByNameByCallUrl);
  router.get('/loshi/api/ajax/queryListCountGroupByNameByCallUrl', checkIsLogin, controller.ajax.queryListCountGroupByNameByCallUrl);

  // ----------------------------slowResource--------------------------------------
  router.get('/loshi/api/slowResource/queryListByCallUrl', checkIsLogin, controller.slowResource.queryListByCallUrl);
  router.get('/loshi/api/slowResource/queryListCountByCallUrl', checkIsLogin, controller.slowResource.queryListCountByCallUrl);

  // ----------------------------slowPages--------------------------------------
  router.get('/loshi/api/slowPages/querListByUrl', checkIsLogin, controller.slowPages.querListByUrl);
  router.get('/loshi/api/slowPages/querListCountByUrl', checkIsLogin, controller.slowPages.querListCountByUrl);

  // ----------------------------error--------------------------------------
  router.get('/loshi/api/error/getList', checkIsLogin, controller.error.getList);
  router.get('/loshi/api/error/getListCount', checkIsLogin, controller.error.getListCount);
};
