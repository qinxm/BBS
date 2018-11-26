'use strict';

const Controller = require('egg').Controller;
class UserController extends Controller {
  async info() {
    const userId = this.ctx.params.id;
    // const sessionUser = await this.ctx.session.user
    // if (sessionUser && (userId == sessionUser.uid)){
    //   this.ctx.body = sessionUser;
    // } else {
      const userInfo = await this.ctx.service.user.find(userId);
      this.ctx.body = userInfo;
    // }
  }

  async loginAction() {
    const userName = this.ctx.request.body.username;
    const password = this.ctx.request.body.password;
    let remember = this.ctx.request.body.remember;
    const user = await this.ctx.service.user.login(userName, password);
    // this.ctx.body = userInfo;

    if (user && user.uid) {
      this.ctx.session.user = user;
      if (remember) {
        this.ctx.session.maxAge = 3 * 24 * 3600 * 1000;
      }
      this.ctx.body = {
        code: 200,
        message: '登录成功',
        result: user
      }
    } else {
      const errObj = {
        code: 501,
        message: '账号或者密码错误!',
      };
      await this.ctx.render('error', errObj);
    }
  }

  async registerAction() {
    const obj = this.ctx.request.body
    const result = await this.ctx.service.user.register(obj);
    if (result.affectedRows === 1) {
      this.ctx.body = {
        code: 200,
        message: '操作成功'
      }
    } else {
      this.ctx.body = {
        code: 501,
        message: '操作失败'
      }
    }
    
  }

  async updateAction() {
    const obj = this.ctx.request.body
    const result = await this.ctx.service.user.updateUser(obj);
    if (result.affectedRows === 1) {
      this.ctx.body = {
        code: 200,
        message: '操作成功'
      }
    } else {
      this.ctx.body = {
        code: 501,
        message: '操作失败'
      }
    }
  }

  async deleteAction() {
    const obj = this.ctx.request.body
    const result = await this.ctx.service.user.deleteUser(obj);
    if (result.affectedRows === 1) {
      this.ctx.body = {
        code: 200,
        message: '操作成功'
      }
    } else {
      this.ctx.body = {
        code: 501,
        message: '操作失败'
      }
    }
  }
}
module.exports = UserController;