export const deleteKey = (obj) => {
  let newObj = JSON.parse(JSON.stringify(obj))

  for (var key in newObj) {
    if (newObj[key] === null || newObj[key] === '') {
      delete newObj[key]
    }
  }
  return newObj
}// 提交后端的时候，需要把空字符的key删除掉。这样可以优化后端的压力
