/**
 * 数字相关的工具方法
 */

// 数字千分位分割, 支持小数（最多两位）  123456 -> 123,456
function numberWithCommas (num) {
  if (arguments.length !== 1) {
    throw new Error('参数异常，需要一个参数')
  }
  if (typeof num !== 'number') {
    throw new Error('参数类型异常，需要一个数字')
  }
  num = String(num).split('.')
  num[0] = num[0].replace(new RegExp('(\\d)(?=(\\d{' + 3 + '})+$)', 'ig'), '$1,')
  if (num[1] && num[1].length > 2) num[1] = num[1].substr(0, 2)
  return num.join('.')
}

export default {
  numberWithCommas
}
