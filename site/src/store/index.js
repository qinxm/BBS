import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import users from './modules/users'

const store = new Vuex.Store({
  modules: {
    // detail,
    users,
  },
  actions: {
  },
  mutations: {
  },
})

export default store
