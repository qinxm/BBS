export const uniqueArray= (array, key)=> {
  var result = [array[0]];
  for (var i = 1; i < array.length; i++) {
    var item = array[i];
    var repeat = false;
    for (var j = 0; j < result.length; j++) {
      if (item[key] == result[j][key]) {
        repeat = true;
        break;
      }
    }
    if (!repeat) {
      result.push(item);
    }
  }
  return result;
}//删除json串里key相同的去重 例如[{key:"a"},{key:"a"}],去重后只有1项。。