/*
 * @Description: 
 * @Autor: Waker
 * @Date: 2020-11-17 11:06:13
 * @LastEditors: Waker
 * @LastEditTime: 2020-11-17 13:22:49
 */

// import Vue from 'vue'
import router from '@/router/index.js'

import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  document.title = to.meta.title? `中恒VUE平台前端架构 - ${to.meta.title}`:'中恒VUE平台前端架构'
  next()
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
