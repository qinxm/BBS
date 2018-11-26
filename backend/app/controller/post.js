"use strict";

const Controller = require("egg").Controller;
class PostController extends Controller {
  async createAction() {
    const obj = this.ctx.request.body
    let cookieObj = this.ctx.helper.getCookieObject(this.ctx)
    let isVerify = await this.ctx.helper.verifyToken(this.ctx, cookieObj.userId);
    if (!isVerify) {
      this.ctx.status = 401;
      this.ctx.body = {
        message: 'token失效'
      }
      return
    }
    const result = await this.ctx.service.post.create(obj);
    if (result.affectedRows === 1) {
      this.ctx.body = {
        code: 200,
        message: '创建成功',
        result: {
          id: result.insertId
        }
      }
    } else {
      const errObj = {
        code: 501,
        message: '创建失败!',
      };
      await this.ctx.render('error', errObj);
    }
  }
  async getListAction() {
    const obj = this.ctx.request.body
    try {
      const result = await this.ctx.service.post.getList(obj);
      this.ctx.body = {
        code: 200,
        message: '操作成功',
        result:  result
      }
    } catch(e) {
      this.ctx.body = {
        code: 501,
        message: '操作异常',
        result:  e
      }
    }
  }
  async getInfoAction() {
    const obj = this.ctx.request.body
    try {
      const result = await this.ctx.service.post.getInfo(obj);
      this.ctx.body = {
        code: 200,
        message: '操作成功',
        result:  result
      }
    } catch(e) {
      this.ctx.body = {
        code: 501,
        message: '操作异常',
        result:  e
      }
    }
  }

}
module.exports = PostController;
