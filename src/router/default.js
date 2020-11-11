/*
 * @Description: 
 * @Autor: Waker
 * @Date: 2020-11-10 17:06:05
 * @LastEditors: Waker
 * @LastEditTime: 2020-11-11 18:22:30
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/testPage/index.vue')
  },
  {
    path: '/icon',
    name: 'icon',
    component: () => import('../views/testPage/icon.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
