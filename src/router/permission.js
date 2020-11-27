/*
 * @Description: 
 * @Autor: Waker
 * @Date: 2020-11-17 11:06:13
 * @LastEditors: Waker
 * @LastEditTime: 2020-11-17 20:57:28
 */

import Vue from 'vue'
import router from './index.js'
import { defaultRouterList } from './list.js'
import { ACCESS_TOKEN } from '@/store/mutation-types'

import NProgress from 'nprogress'
import '@/components/NProgress/nprogress.less'

NProgress.configure({ showSpinner: false })

// 白名单name集合
const whiteList = defaultRouterList.map(item => item.name)

router.beforeEach((to, from, next) => {
  NProgress.start()
  // 页面标题
  document.title = to.meta.title ? `中恒VUE平台前端架构 - ${to.meta.title}` : '中恒VUE平台前端架构'
  // 通用路由直接进入
  if (whiteList.includes(to.name)) {
    next()
    return
  }
  // 没token的直接跳转带登录
  if (!Vue.ls.get(ACCESS_TOKEN)) {
    next('/login')
    return
  }

  next()
})

router.afterEach((to, from) => {
  NProgress.done()

})
