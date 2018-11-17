import utils from '@/utils/cookie.js'

const state = () => { 
  return {
    nickName: '',
  }
}

// getters
const getters = {
  getNickName: state => state.nickName,
}


// actions
const actions = {
  
}

// mutations
const mutations = {
  async setNickName(state, data) {
    state.nickName = data
    utils.setCookie({
      nick_name: data
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
