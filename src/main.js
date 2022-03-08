// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'url-search-params-polyfill'
import store from './store/store'
import getHotPost from './common.js'
Vue.prototype.common = getHotPost
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueAxios, axios)
/* eslint-disable no-new */
Vue.prototype.$axios = axios
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 判断是否存在token,如果存在将每个页面header添加token
  config.headers.common['jwt'] = ''
  if (sessionStorage.getItem('jwt')) {
    config.headers.common['jwt'] = sessionStorage.getItem('jwt')
  }
  return config
}
)
axios.interceptors.response.use((response) => {
  if (response.data.msg === 'token过期') refresh()
  return response
})
function refresh () {
  axios({
    method: 'get',
    url: 'http://localhost:8080/RefreshToken',
    headers: {
      refresh: sessionStorage.getItem('refresh')
    }
  }).then(function (response) {
    sessionStorage.setItem('jwt', response.data.data.jwt)
    sessionStorage.setItem('refresh', response.data.data.refresh)
    window.location.reload()
  })
}
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
