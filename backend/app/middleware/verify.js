
module.exports = options => {
  return async function verify(ctx, next) {
    let cookieObj = ctx.helper.getCookieObject(ctx);
    let isVerify = false
    if (cookieObj && cookieObj) {
      isVerify = await ctx.helper.verifyToken(ctx, cookieObj);
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
