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
const whiteList = [...defaultRouterList.map(item => item.name),'404'];

let isInit = true;
// let routerComponentsName= ''

router.beforeEach(async (to, from, next) => {
  
  NProgress.start()
  // 页面标题
  document.title = to.meta.title ? `中恒VUE平台前端架构 - ${to.meta.title}` : '中恒VUE平台前端架构'

  // 如果去的页面不是已经缓存了的页面,则清除缓存
  
  //  && 
  if((from.meta.keepAlive||[]).includes(to.name)){
    console.log('去了可以缓存的页面');
  }else{
    console.log('去了不缓存的页面');
    store.commit('DELETE_KEEPALIVEINCLUDES')
  }

  if(to.meta.keepAlive){
    //from.name不存在的情况:name没写或者初次打开
    // const componentsName = to.matched[to.matched.length-1].components.default.name
    store.commit('SET_KEEPALIVEINCLUDES',{
      path:`${from.name}___${to.name}`,
      componentName:to.name
    })
  }

  // 刷新页面就触发
  if (isInit) {
    // 前置获取系统url映射
    await store.dispatch('getSystemUrl')
    // 在url中获取token跟conpanyId
    const { query: { token, companyId } } = to
    // 本地或者url没token就退出登录
    if ((!token || !token) && (!store.state.user.token || !store.state.user.companyId)) {
      store.dispatch('Logout')
      return
    }
    // 权限
    store.dispatch('SetUserInfo', { token, companyId }).then(res => {
      router.addRoutes(store.state.user.routers)
      if(token || companyId){
        next({ ...to, query: {} })
      }else {
        //fix:不要删to
        next(to)
      }
    })

    isInit = false
    return
  }

  // 通用路由直接进入
  if (whiteList.includes(to.name)) {
    next()
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
  // 清理keepAliveIncludes 防止所有页面都缓存
  // store.commit('SET_KEEPALIVEINCLUDES',[])
  NProgress.done()
})


