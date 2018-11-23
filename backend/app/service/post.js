const Service = require('egg').Service;
class UserService extends Service {
  // 默认不需要提供构造函数。
  // constructor(ctx) {
  //   super(ctx);
  // }
  async create(obj) {
    const result = await this.app.mysql.insert('pre_forum_post', { 
      author: obj.author,
      authorid: obj.authorid,
      subject: obj.subject,
      message: obj.message,
      status: 1
     });
    return result;
  }
  async getList(obj) {
    const result = await this.app.mysql.select('pre_forum_post', {
       limit: obj.pageSize,
       offset: obj.pageNum-1
    })
    return result
  }

}
module.exports = UserService;
