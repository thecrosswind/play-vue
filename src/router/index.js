import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import header from '../components/header.vue'
import Home from '../views/Home/index.vue'
import Layout from '../views/Layout/index.vue'
import Play from '../views/Play/index.vue'
import Search from '../views/Search/index.vue'


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
    },
    {
      path: '/layout/home',
      component: Home
    },
    {
      path: '/Layout',
      component: Layout
    },
    {
      path: '/Play',
      component: Play
    },
    {
      path: '/layout/Search',
      component: Search
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
