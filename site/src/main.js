import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './store'
import moment from 'moment'
import iView from 'iview'
import "iview/dist/styles/iview.css"
import '@/components/index.js'
import '@/common/mixins/index.js'
import '@/assets/static/css/style.scss'

Vue.config.productionTip = false
Vue.use(iView)
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
