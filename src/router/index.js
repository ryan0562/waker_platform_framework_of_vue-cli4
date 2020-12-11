/*
 * @Description:
 * @Autor: Waker
 * @Date: 2020-11-13 10:15:59
 * @LastEditors: Waker
 * @LastEditTime: 2020-11-17 17:33:41
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import { permissionRouterList, defaultRouterList } from './list.js'
Vue.use(VueRouter)



/* 路由计算函数 */
const computedRouterList = function () {
  /* 非生产环境显示全路由 */
  // if(process.env.NODE_ENV !== 'production') return permissionRouterList.concat(defaultRouterList)

  /* 权限路由 */
  // getPermission()
  return defaultRouterList
}

export default new VueRouter({
  // mode: 'history',
  routes: computedRouterList(),
  scrollBehavior: () => ({ y: 0 }),
})

