"use strict";

const Controller = require("egg").Controller;
const Error501 = function(result, message='操作异常') {
  return  {
    code: 501,
    message,
    result
  }
}
const Success200 = function(result, message='操作成功') {
  return  {
    code: 200,
    message,
    result
  }
}
class PostController extends Controller {
  async createAction() {
    const obj = this.ctx.request.body
    try {
      const result = await this.ctx.service.post.create(obj);
      this.ctx.body = Success200({
        id: result.insertId
      })
    } catch(e) {
      this.ctx.body = Error501(e )
    }

    // const result = await this.ctx.service.post.create(obj);
    // if (result.affectedRows === 1) {
    //   this.ctx.body = {
    //     code: 200,
    //     message: '创建成功',
    //     result: {
    //       id: result.insertId
    //     }
    //   }
    // } else {
    //   const errObj = {
    //     code: 501,
    //     message: '创建失败!',
    //   };
    //   await this.ctx.render('error', errObj);
    // }
  }
  async getListAction() {
    const obj = this.ctx.request.body
    try {
      const result = await this.ctx.service.post.getList(obj);
      this.ctx.body = Success200(result)
    } catch(e) {
      this.ctx.body = Error501(e)
    }
  }
  async getInfoAction() {
    const obj = this.ctx.request.body
    try {
      const result = await this.ctx.service.post.getInfo(obj);
      this.ctx.body = Success200(result)
    } catch(e) {
      this.ctx.body = Error501(e)
    }
  }
  async getPostCommentsAction() {
    const obj = this.ctx.request.body
    try {
      const result = await this.ctx.service.post.getPostComments(obj);
      this.ctx.body = Success200(result)
    } catch(e) {
      this.ctx.body = Error501(e)
    }
  }
  async searchAction() {
    const obj = this.ctx.request.body
    try {
      const result = await this.ctx.service.post.search(obj);
      this.ctx.body = Success200(result)
    } catch(e) {
      this.ctx.body = Error501(e)
    }
  }
  async addLikeAction() {
    const obj = this.ctx.request.body
    try {
      const result = await this.ctx.service.post.addLike(obj);
      this.ctx.body = Success200(result)
    } catch(e) {
      this.ctx.body = Error501(e)
    }
  }

  async addCommentAction() {
    const obj = this.ctx.request.body
    try {
      const result = await this.ctx.service.post.addComment(obj);
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

  async getCommentAction() {
    const obj = this.ctx.request.body
    try {
      const result = await this.ctx.service.post.addComment(obj);
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
