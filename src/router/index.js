/*
 * @Description:
 * @Autor: Waker
 * @Date: 2020-11-13 10:15:59
 * @LastEditors: Waker
 * @LastEditTime: 2020-11-13 21:25:38
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import routerList from './list.js'

Vue.use(VueRouter)

const computedRouterList = function () {
  return routerList.permissionRouterList.concat(routerList.defaultRouterList)
}


const router = new VueRouter({
  routes: computedRouterList(),
  scrollBehavior: () => ({ y: 0 }),
})

export default {
  router
}
