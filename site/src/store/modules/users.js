import utils from '@/utils/cookie.js'

const state = () => { 
  return {
    nickName: '',
    userName: ''
  }
}

// getters
const getters = {
  getNickName: state => state.nickName,
  getUserName: state => state.userName,
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
  async setUserName(state, data) {
    state.userName = data
    utils.setCookie({
      userName: data
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
