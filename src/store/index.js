/*
 * @Description: 
 * @Autor: Waker
 * @Date: 2020-11-10 17:06:25
 * @LastEditors: Waker
 * @LastEditTime: 2020-11-16 20:40:59
 */
import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import createVuexAlong from "vuex-along";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
  },
  state: {
    keepAliveIncludes:[]
  },
  mutations: {
    // 设置缓存页面
    SET_KEEPALIVEINCLUDES: (state, data) => {
      // {
      //   path:`${from.name}-->${to.name}`,
      //   componentName:to.name,
      //   always:to.meta.keepAlive.length===0
      // }
      const has = state.keepAliveIncludes.find(i=>i.path === data.path)
      if(!has){
        state.keepAliveIncludes.push(data)
      }
      // state.keepAliveIncludes.find(i=>i)
      // if(!state.keepAliveIncludes.hasOwnProperty(data.path)){
      //   state.keepAliveIncludes = Object.assign({},state.keepAliveIncludes,{
      //     [data.path]:data.componentName
      //   }) 
      // }
      // if(Array.isArray(data)){
      //   if(data.length>0) {
      //     state.keepAliveIncludes = data
      //   } else {
      //     state.keepAliveIncludes = '/.*/'
      //   }
      // }
      
      
    },
    DELETE_KEEPALIVEINCLUDES:(state, data) => {
      state.keepAliveIncludes = state.keepAliveIncludes.filter(i=>i.always)
      // let newValue = {}
      // for(let i in state.keepAliveIncludes){
      //   const item = state.keepAliveIncludes[i]
      //   if(item.always){
      //     newValue[i] = item
      //   }
      // }
      // state.keepAliveIncludes = newValue
    }
  },
  actions: {
    // // 设置缓存页面
    // set_keepAlive({ commit }, data) {
      
    //   commit('SET_KEEPALIVEINCLUDES',data)
    // },
  },
  plugins:[
    // 持久化 vuex
    createVuexAlong({
      name: "vuex-along",
      local: {
        list: ["user"],
      },
    })
  ]
})
