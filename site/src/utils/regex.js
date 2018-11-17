/**
 * 通用正则工具方法
 */

/**
 * 是否手机号
 * @param {*} phoneVal 
 */
const isPhone = (phoneVal) =>  {
  return /^1[0-9]{10}$/.test(phoneVal)
}

/**
 * 是否邮箱地址
 * @param {*} emailVal 
 */
const isEmail = (emailVal) => {
  return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(emailVal)
}

/**
 * 是否URL地址
 * @param {*} urlVal 
 */
const isURL = (urlVal) => {
  return /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/.test(urlVal)
}

/**
 * 是否字母数字
 * @param {*} val 
 */
const isAlphanumeric = (val) => {
  return /^[A-Za-z0-9]+$/.test(val)
}

const isIdentityNo = (val) => {
  return /(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(val)
}

export default {
  isAlphanumeric,
  isPhone,
  isIdentityNo,
  isEmail,
  isURL
}
