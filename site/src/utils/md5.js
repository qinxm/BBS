import crypto from 'crypto'
/**
 * 加密方法
 */
export const hashEncrypt = (data) => {
  let md5 = crypto.createHash('md5')
  md5.update(data)
  let password = md5.digest('hex')
  return password
}
