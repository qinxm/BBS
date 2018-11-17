'use strict';

const Controller = require('egg').Controller;
class UserController extends Controller {
  async info() {
    const userId = this.ctx.params.id;
    const userInfo = await this.ctx.service.user.find(userId);
    this.ctx.body = userInfo;
  }

  async loginAction() {
    const userName = this.ctx.request.body.userName;
    const password = this.ctx.request.body.password;
    const user = await this.ctx.service.user.login(userName, password);
    if (user._id) {
      this.ctx.session.user = user;
      if (remember) {
        this.ctx.session.maxAge = 3 * 24 * 3600 * 1000;
      }
    } else {
      const errObj = {
        msg: '账号或者密码错误!',
      };
      await this.ctx.render('error', errObj);
    }
  }

}
module.exports = UserController;