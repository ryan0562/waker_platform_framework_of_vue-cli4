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
import store from '@/store/index'

import NProgress from 'nprogress'
import '@/components/NProgress/nprogress.less'

NProgress.configure({ showSpinner: false })

// 白名单name集合
const whiteList = [...defaultRouterList.map(item => item.name),'404'];

let isInit = true;
function routerComponentCache(to){
  // 将所有缓存页面的keepalive拿出来扁平化
  let cachePath = store.state.keepAliveIncludes.map(i=>i.keepAlive).flat(Infinity)
  // 去了不缓存的页面就清理所有非常驻缓存组件
  if(!cachePath.includes(to.name)){
    // console.log('去了不缓存的页面');
    store.commit('DELETE_KEEPALIVEINCLUDES')
  }

  if(to.meta.keepAlive){
    //from.name不存在的情况:name没写或者初次打开
    // const componentsName = to.matched[to.matched.length-1].components.default.name
    store.commit('SET_KEEPALIVEINCLUDES',{
      path:`${to.name}`,
      componentName:to.name,//要求路由name跟默认组件的name保持一致
      always:to.meta.keepAlive.length===0,
      keepAlive:to.meta.keepAlive,
    })
  }
}

router.beforeEach(async (to, from, next) => {
  
  NProgress.start()
  // 页面标题
  document.title = to.meta.title ? `中恒VUE平台前端架构 - ${to.meta.title}` : '中恒VUE平台前端架构'

  // 组件缓存机制
  routerComponentCache(to)

  // 刷新页面就触发
  if (isInit) {
    isInit = false
    // 前置获取系统url映射
    await store.dispatch('getSystemUrl')
    // 在url中获取token跟conpanyId
    const { query: { token, companyId } } = to
    // 本地或者url没token就退出登录

    if(token && companyId){
      // 获取权限
      await store.dispatch('SetUserInfo', { token, companyId })
      router.addRoutes(store.state.user.routers)

      // 白名单
      if (whiteList.includes(to.name)) {
        next(to)
        return
      }

      next({ ...to, query: {} })
      return
    } else {
      // 白名单
      if (whiteList.includes(to.name)) {
        next()
        return
      }

      if (!store.state.user.token) {
        store.dispatch('Logout')
        return
      }

      // 获取权限
      await store.dispatch('SetUserInfo', { token:store.state.user.token, companyId:store.state.user.companyId })
      router.addRoutes(store.state.user.routers)

      next(to)
      return
    }

  }

  // 通用路由直接进入
  if (whiteList.includes(to.name)) {
    next()
    return
  }

  // // 没token直接跳转登录
  if (!store.state.user.token) {
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


