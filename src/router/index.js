/*
 * @Description:
 * @Autor: Waker
 * @Date: 2020-11-13 10:15:59
 * @LastEditors: Waker
 * @LastEditTime: 2020-11-13 11:21:51
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import defaultRouterList from './default'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: defaultRouterList
})

export default {
  router
}
