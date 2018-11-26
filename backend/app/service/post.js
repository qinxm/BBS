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
      status: 1,
      tags: obj.tags,
      title: obj.title,
      liketimes: 0,
      commenttimes: 0,
      publishtime: new Date(),
      viewtimes: 0,
     });
    return result;
  }
  async getList(obj) {
    const result = await this.app.mysql.select('pre_forum_post', {
      orders: [['pid','desc']],
      limit: obj.pageSize,
      offset: obj.pageNum-1
    })
    return result
  }
  async getInfo(obj) {
    // const result = await this.app.mysql.get('pre_forum_post', {
    //   pid: obj.pid
    // })
    const result = await this.app.mysql.query(`select a.*, b.avatarurl, b.username from pre_forum_post a left join pre_common_member b on a.authorid = b.uid  where a.pid=${obj.pid} `)
    return result && result [0]
  }

}
module.exports = UserService;
