'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/bbs', controller.bbshome.index);
  router.post('/user/get/:id', controller.user.info);

  router.post('/api/users/login', controller.user.loginAction);
  router.post('/user/register', controller.user.registerAction);
  router.post('/user/update', controller.user.updateAction);
  router.post('/user/delete', controller.user.deleteAction);
  //router.get('/user/loginAction', controller.user.loginAction);
};
