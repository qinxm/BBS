import utils from '@/utils/cookie.js'

const state = () => { 
  return {
    nickName: '',
    userId: '',
    userToken: ''
  }
}

// getters
const getters = {
  getNickName: state => state.nickName,
  getUserId: state => state.userId,
  getUseToken: state => state.userToken,
}


// actions
const actions = {
  
}

// mutations
const mutations = {
  async setNickName(state, data) {
    state.nickName = data
    utils.setCookie({
      nickName: data
    })
  },
  async setUserId(state, data) {
    state.userId = data
    utils.setCookie({
      userId: data
    })
  },
  async setUserToken(state, data) {
    state.userToken = data
    utils.setCookie({
      accessToken: data
    })
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}
