import utils from '@/utils/cookie.js'
import VueCookies from 'vue-cookies'

const state = () => { 
  return {
    nickName: '',
    userName: '',
    userId: '',
    userToken: ''
  }
}

// getters
const getters = {
  getNickName: state => state.nickName || VueCookies.get('nickName'),
  getUserId: state => state.userId || VueCookies.get('userId'),
  getUserName: state => state.userName || VueCookies.get('userName'),
  getUseToken: state => state.userToken || VueCookies.get('userToken'),
}


// actions
const actions = {
  
}

// mutations
const mutations = {
  async setNickName(state, data) {
    state.nickName = data
    VueCookies.set('nickName', data)
  },
  async setUserId(state, data) {
    state.userId = data
    VueCookies.set('userId', data)
  },
  async setUserName(state, data) {
    state.userName = data
    VueCookies.set('userName', data)
  },
  async setUserToken(state, data) {
    state.userToken = data
    VueCookies.set('accessToken', data)
  },
  async setLogout(state, data) {
    state.nickName = ''
    state.userName = ''
    state.userId = ''
    state.userToken = ''
    VueCookies.remove('userId')
    VueCookies.remove('userName')
    VueCookies.remove('accessToken')
    VueCookies.remove('nickName')
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}
