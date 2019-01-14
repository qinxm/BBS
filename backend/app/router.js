'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const verify = app.middleware.verify({});
  app.passport.mount('github');
  
  router.get('/', controller.home.index);
  router.post('/user/get/:id', controller.user.info);

  router.post('/api/users/login', controller.user.loginAction);
  router.post('/user/register', controller.user.registerAction);
  router.post('/user/update', controller.user.updateAction);
  router.post('/user/delete', controller.user.deleteAction);

  router.post('/api/post/create',  verify,  controller.post.createAction)
  router.post('/api/post/getList',verify, controller.post.getListAction)
  router.post('/api/post/getInfo', controller.post.getInfoAction)
  router.post('/api/post/getComments', controller.post.getPostCommentsAction)
  router.post('/api/post/search', controller.post.searchAction)
  router.post('/api/post/addLike', controller.post.addLikeAction)

  router.post('/api/post/addComment', verify, controller.post.addCommentAction)
  router.post('/api/post/getCommentList', controller.post.getCommentAction)
  
  router.post('/api/theme/create', controller.theme.create)
  //router.get('/user/loginAction', controller.user.loginAction);
};
