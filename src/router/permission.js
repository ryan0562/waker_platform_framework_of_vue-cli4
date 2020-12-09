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
import { getSystemUrlMap } from '@/api/user'

NProgress.configure({ showSpinner: false })

// 白名单name集合
const whiteList = defaultRouterList.map(item => item.name);

// 获取系统url映射
async function getSystemUrl() {
  const res = await getSystemUrlMap({})
  const result = {}
  res.dataList.forEach(item => {
    result[item.id] = item.frontpath
  })
  Vue.ls.set('systemUrlMap', result)
}

// init().finally(res => {
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  // 页面标题
  document.title = to.meta.title ? `中恒VUE平台前端架构 - ${to.meta.title}` : '中恒VUE平台前端架构'

  // 获取系统url映射
  try {
    await getSystemUrl()
  } catch (err) {
    throw new Error('获取系统列表出错')
  }
  // 通用路由直接进入
  if (whiteList.includes(to.name)) {
    next()
    return
  }
  // 在url中获取token跟conpanyId
  const { query: { token, companyId } } = to
  if (token && companyId) {
    store.dispatch('SetUserInfo', { token, companyId }).then(res => {
      next({ ...to, query: {} })
      // next()
    })
    return
  }

  // 没token直接跳转带登录
  if (!store.state.user.token || !store.state.user.companyId) {
    // console.error('登录超时')
    store.dispatch('Logout')
    return
  }

  next()
})

router.afterEach((to, from) => {
  NProgress.done()
})
// })


