const Service = require('egg').Service;
class ThemeService extends Service {
  // 默认不需要提供构造函数。
  constructor(ctx) {
    super(ctx); //如果需要在构造函数做一些处理，一定要有这句话，才能保证后面 `this.ctx`的使用。
    // 就可以直接通过 this.ctx 获取 ctx 了
    // 还可以直接通过 this.app 获取 app 了
  }
  // 新建文章
  async create(obj) {
    const result = await this.app.mysql.insert('pre_user_theme', {
      uid: obj.userId,
      username: obj.userName,
      themestring: obj.themestring,
      createtime: new Date()
     });
    return result;
  }
}
module.exports = ThemeService;