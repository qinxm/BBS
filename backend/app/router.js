'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/bbs', controller.bbshome.index);
  router.get('/user/get/:id', controller.user.info);

   router.post('/user/loginAction', controller.user.loginAction);
  //router.get('/user/loginAction', controller.user.loginAction);
};
