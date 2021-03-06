// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/base.css'

import axios from 'axios'

Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.axios = axios
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
axios.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    // console.log('haha ,请求被我拦截到了把', config)
    // config.headers.aa = 'bb'
    // config.baseURL = 'http://localhost:8888/api/private/v1/'
    config.headers.Authorization = localStorage.getItem('token')
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
// 添加响应拦截器
axios.interceptors.response.use(
  (res) => {
    // 对响应数据做点什么
    // console.log('拦截到了响应', res)
    // 直接返回res.data，对应的就是服务器返回的数据
    return res.data
  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
