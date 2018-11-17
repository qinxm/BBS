/**
 * 字符串相关的工具方法
 */


 /**
  * 是否为空字符串
  * @param {*} str 
  */
 const isEmpty = (str) => {
  return typeof str === 'string' && str.trim() === ''
 }


 export default {
   isEmpty
 }
