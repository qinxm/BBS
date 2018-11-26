
module.exports = options => {
  return async function verify(ctx, next) {
    let cookieObj = ctx.helper.getCookieObject(ctx);
    let isVerify = false
    if (cookieObj && cookieObj.userId) {
      isVerify = await ctx.helper.verifyToken(ctx, cookieObj.userId);
    }
    if (isVerify) {
      await next();
    } else {
      ctx.status = 401;
      ctx.body = {
        message: 'token失效'
      }
      return
    }
  };
};
