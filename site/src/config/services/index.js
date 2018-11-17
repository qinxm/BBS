import request from '@/utils/request'
import apiList from '../apis/index'

let services = {}
for (var key in apiList) {
  if(apiList.hasOwnProperty(key)) {
    let url = apiList[key]
    services[key] = async(data) => {
      return request({
        url,
        method: 'post',
        data
      })
    }
  }
}
export default services