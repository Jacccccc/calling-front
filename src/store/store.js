import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName: '',
    avatar: '',
    maxRole: '',
    logged: false
  },
  mutations: {
    setUserName (state, userName) {
      state.userName = userName
      state.logged = true
    },
    setAvatar (state, avatar) {
      state.avatar = avatar
    },
    setMaxRole (state, maxRole) {
      state.maxRole = maxRole
    }
  }
})
