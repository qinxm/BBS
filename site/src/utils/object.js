/**
 * 对象相关的工具方法
 */

 /**
  * 移除对象中的空值 考虑有实际意义的 0
  * @param {*} obj 
  */
 const removeNull = (obj) => {
  var newObj = {}
  Object.keys(obj).forEach(function (prop) {
    if (obj[prop] === 0 || obj[prop] === '0' || !!obj[prop]) {
      newObj[prop] = obj[prop]
    }
  })
  return newObj
 }

 /**
  * 去掉对象中字符串类型字段的左右空格
  * @param {*} obj 
  */
 const trimStrVal = (obj) => {
  Object.keys(obj).forEach(function (prop) {
    if (typeof obj[prop] === 'string') {
      obj[prop] = obj[prop].trim()
    }
  })
 }

 export default {
  removeNull,
  trimStrVal
 }