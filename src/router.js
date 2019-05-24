import Vue from 'vue'
import Router from 'vue-router'

import Index from './views/Index.vue'
import Exercise1 from './views/Exercise1.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: function () {
        return import(/* webpackChunkName: "index" */ './views/Index.vue')
      }
    },
    {
      path: '/exercise1',
      name: 'exercise1',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: function () {
        return import(/* webpackChunkName: "exercise1" */ './views/Exercise1.vue')
      }
    }
  ]
})
