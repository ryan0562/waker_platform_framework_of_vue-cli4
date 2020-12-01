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
import store from '@/store/index'

import NProgress from 'nprogress'
import '@/components/NProgress/nprogress.less'

NProgress.configure({ showSpinner: false })

// 白名单name集合
const whiteList = defaultRouterList.map(item => item.name)

// 重定向到login
const redirectLogin = (next) => {
  next('/login')
}

// 重定义next
const reNext = (to, from, next) => {
  // 重定向逻辑
  const redirect = decodeURIComponent(from.query.redirect || to.path)
  if (to.path === redirect) {
    // 导航不会留下历史记录,回退的时候不需要点击两次
    next({ ...to, replace: true })
  } else {
    // 跳转到目的路由
    next({ path: redirect })
  }
}

router.beforeEach((to, from, next) => {
  NProgress.start()
  // 页面标题
  document.title = to.meta.title ? `中恒VUE平台前端架构 - ${to.meta.title}` : '中恒VUE平台前端架构'
  // 通用路由直接进入
  if (whiteList.includes(to.name)) {
    next()
    return
  }
  // 在url中获取token跟conpanyId
  const { query: { token, companyId } } = to
  if (token && companyId) {
    store.dispatch('SetUserInfo', { token, companyId }).then(res => {
      next()
    })
    return
  }

  // 没token直接跳转带登录
  if (!store.state.user.token || !store.state.user.companyId) {
    redirectLogin(next)
    return
  }







  // 没用户信息去请求用户信息
  // if (!Vue.ls.get('user')) {
  //   store.dispatch('GetInfo').then(res => {
  //     debugger
  //     if (lodash.isEmpty(store.getters.permission)) {
  //       store.dispatch('GetPermission', {
  //         userId: res.data.id,
  //         companyId: store.getters.companyId,
  //       }).then(perRes => {
  //         store.dispatch('GenerateRoutes', perRes.dataList).then(() => {
  //           // 根据roles权限生成可访问的路由表
  //           // 动态添加可访问路由表
  //           router.addRoutes(store.getters.addRouters)
  //           // 请求带有 redirect 重定向时，登录自动重定向到该地址
  //           const redirect = decodeURIComponent(from.query.redirect || to.path)
  //           if (to.path === redirect) {
  //             // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
  //             next({ ...to, replace: true })
  //           } else {
  //             // 跳转到目的路由
  //             next({ path: redirect })
  //           }
  //         })
  //       }).catch((err) => {
  //         notification.error({
  //           message: '错误',
  //           description: (err || {}).message || '请求用户权限列表失败',
  //         })
  //         store.dispatch('Logout').then(() => {
  //           next({ path: '/login', query: { redirect: to.fullPath } })
  //         })
  //       })
  //     }
  //   })
  // }
  next()

})

router.afterEach((to, from) => {
  NProgress.done()

})
