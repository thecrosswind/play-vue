import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import header from '../components/header.vue'


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/header',
      component: header
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
    return
  }
  next()
  // let token = localStorage.getItem('token')
  // if (token) {
  //   next()
  // } else {
  //   next('/login')
  // }
})

export default router
