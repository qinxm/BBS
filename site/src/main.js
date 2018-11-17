import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './store'
import iView from 'iview'
import "iview/dist/styles/iview.css"
import '@/components/index.js'
import '@/common/mixins/index.js'
import '@/assets/static/css/style.scss'
Vue.config.productionTip = false
Vue.use(iView)
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
