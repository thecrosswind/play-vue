import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import User from '../components/User.vue'
import Rights from '../components/rights.vue'
import Roles from '@/components/roles'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '/users',
          component: User
        },
        {
          path: '/rights',
          component: Rights
        },
        {
          path: '/roles',
          component: Roles
        }
      ]
    },
    {
      path: '/login',
      component: Login
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
