import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './store'
import moment from 'moment'
import iView from 'iview'

import "iview/dist/styles/iview.css"
import '@/components/index.js'
import '@/common/mixins/index.js'

import '@/assets/static/css/index.scss'
moment.locale('zh-cn');
Vue.config.productionTip = false
Vue.use(iView)
import ZkTable from 'vue-table-with-tree-grid'
Vue.use(ZkTable)
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})
Vue.filter('dateformatFromNow', function(dataStr) {
  // 时间差
  let tdoa = new Date().getTime() - new Date(dataStr).getTime() 
  // 小于 1小时
  if (tdoa < 3600000) {
    return moment(dataStr).startOf('minute').fromNow()
  }
  // 小于 1天
  else if (tdoa < 86400000) {
    return moment(dataStr).startOf('hour').fromNow()
  }
  // 小于 1周
  else if (tdoa < 604800000) {
    return moment(dataStr).startOf('day').fromNow()
  }
  // 小于 一个月
  else if (tdoa < 2592000000) {
    return moment(dataStr).startOf('week').fromNow()
  }
  // 小于 一年
  else if (toda < 31104000000) {
    return moment(dataStr).startOf('month').fromNow()
  } 
  // 大于一年
  else {
    return moment(dataStr).startOf('year').fromNow()
  }
  
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
