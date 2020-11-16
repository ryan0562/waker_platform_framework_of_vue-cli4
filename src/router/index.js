/*
 * @Description:
 * @Autor: Waker
 * @Date: 2020-11-13 10:15:59
 * @LastEditors: Waker
 * @LastEditTime: 2020-11-16 10:20:34
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import routerList from './list.js'

Vue.use(VueRouter)

/* 路由计算函数 */
const computedRouterList = function () {
  /* 非生产环境显示全路由 */
  if(process.env.NODE_ENV !== 'production') return routerList.permissionRouterList.concat(routerList.defaultRouterList)

  /* 权限路由 */
  
}


const router = new VueRouter({
  routes: computedRouterList(),
  scrollBehavior: () => ({ y: 0 }),
})

export default {
  router
}
