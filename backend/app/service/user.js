const Service = require('egg').Service;
class UserService extends Service {
  // 默认不需要提供构造函数。
  constructor(ctx) {
    super(ctx); //如果需要在构造函数做一些处理，一定要有这句话，才能保证后面 `this.ctx`的使用。
    // 就可以直接通过 this.ctx 获取 ctx 了
    // 还可以直接通过 this.app 获取 app 了
  }

  createToken(data) {
    return this.app.jwt.sign(data, this.app.config.jwt.secret, {
      expiresIn: "12h"
    });
  }
  verifyToken(token) {
    return new Promise((resolve, reject) => {
      this.app.jwt.verify(token, this.app.config.jwt.secret, function(err, decoded) {
        let result = {};
        if (err) {
          /*
            err = {
              name: 'TokenExpiredError',
              message: 'jwt expired',
              expiredAt: 1408621000
            }
          */
          result.verify = false;
          result.message = err.message;
        } else {
          result.verify = true;
          result.message = decoded;
        }
        resolve(result);
      });
    });
  }
  async find(uid) {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    // const user = await this.app.mysql.query('select * from pre_common_member where uid = ?', uid);
    // return user;
    const user = await this.app.mysql.get('pre_common_member', { uid: 123 });
    return { user };
  }

  //登录
  async login(username, password) {
    // const user = await this.app.mysql.query(`select * from pre_common_member where username='${userName}' and password='${password}'`);
    // return user && user[0];
    const user = await this.app.mysql.select('pre_common_member', {
      where: {
        username,
        password
      }
    })
    return user && user[0];
  }
  //注册
  async register(obj) {
    const result = await this.app.mysql.insert('pre_common_member', {
      email: obj.email,
      username: obj.userName,
      password: obj.password,
      status: obj.status,
      emailstatus: obj.emailStatus,
      avatarstatus: obj.avatarStatus
    })
    return result 
  }
  //修改用户信息
  async updateUser(obj) {
    const result = await this.app.mysql.update('pre_common_member', {
      email: obj.email,
      username: obj.userName,
      password: obj.password,
      status: obj.status,
      emailstatus: obj.emailStatus,
      avatarstatus: obj.avatarStatus
    },{
      where: {
        uid: 133
      }
    })
    return result 
  }
  //删除用户信息
  async deleteUser(obj) {
    const result = await this.app.mysql.delete('pre_common_member', {
      uid: obj.uid
    })
    return result 
  }

}
module.exports = UserService;
