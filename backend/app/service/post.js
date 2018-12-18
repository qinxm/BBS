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
    let totalResult = await this.app.mysql.query(`select count(*) as count from pre_forum_post `)
    let total = totalResult && totalResult[0].count
    let pageNum = obj.pageNum
    let pageSize = obj.pageSize
    let pages = Math.ceil(total/pageSize)
    return {
      list: result,
      total,
      pageNum,
      pageSize,
      pages
    }
  }
  async getInfo(obj) {
    // const result = await this.app.mysql.get('pre_forum_post', {
    //   pid: obj.pid
    // })
    const result = await this.app.mysql.query(`select a.*, b.avatarurl, b.username from pre_forum_post a left join pre_common_member b on a.authorid = b.uid  where a.pid=${obj.pid} `)
    return result && result [0]
  }
  async getPostComments(obj) {
    const result = await this.app.mysql.query(`select a.*, b.avatarurl, b.username, b.nickname from pre_forum_postcomment a left join pre_common_member b on a.authorid = b.uid  where pid =${obj.pid} `)
    return result
  }
  async search(obj) {
    let begin = (Number(obj.pageNum)-1) * 10
    const result = await this.app.mysql.query(`select * from pre_forum_post where message like '%${obj.query}%' or title like '%${obj.query}%' limit ${begin},10`)
    
    let totalResult = await this.app.mysql.query(`select count(*) as count from pre_forum_post where message like '%${obj.query}%' or title like '%${obj.query}%'`)
    let total = totalResult && totalResult[0].count
    let pageNum = obj.pageNum
    let pageSize = obj.pageSize
    let pages = Math.ceil(total/pageSize)
    return {
      list: result,
      total,
      pageNum,
      pageSize,
      pages
    }
  }
  async addLike(obj) {
    const result = await this.app.mysql.beginTransactionScope(async conn => {
      let res = await conn.insert('pre_forum_postLike', {
        pid: obj.pid,
        authorid: obj.authorId,
        author: obj.author,
        createtime: new Date(),
      });
      let countObj = await conn.query(`select count(*) as count from pre_forum_postLike where pid = ${obj.pid}`)
      await conn.update('pre_forum_post', {
        liketimes: countObj[0].count
      },{
        where: {
          pid: obj.pid
        }
      });
      return { success: true };
    }, this.ctx); 
  }
  async addComment(obj) {
    const result = await this.app.mysql.beginTransactionScope(async conn => {
      let res = await conn.insert('pre_forum_postcomment', {
        pid: obj.pid,
        authorid: obj.authorId,
        author: obj.author,
        createtime: new Date(),
        updatetime: new Date(),
        comment: obj.comment
      });
      let countObj = await conn.query(`select count(*) as count from pre_forum_postcomment where pid = ${obj.pid}`)
      await conn.update('pre_forum_post', {
        commenttimes: countObj[0].count
      },{
        where: {
          pid: obj.pid
        }
      });
      return { success: true };
    }, this.ctx); 
  }
}
module.exports = UserService;
