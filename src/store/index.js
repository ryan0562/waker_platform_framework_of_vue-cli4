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
    keepAliveIncludes:{}
  },
  mutations: {
    // 设置缓存页面
    SET_KEEPALIVEINCLUDES: (state, data) => {
      if(!state.keepAliveIncludes.hasOwnProperty(data.path)){
        state.keepAliveIncludes = Object.assign({},state.keepAliveIncludes,{
          [data.path]:data.componentName
        }) 
      }
      // if(Array.isArray(data)){
      //   if(data.length>0) {
      //     state.keepAliveIncludes = data
      //   } else {
      //     state.keepAliveIncludes = '/.*/'
      //   }
      // }
      
      
    },
    DELETE_KEEPALIVEINCLUDES:(state, data) => {
      state.keepAliveIncludes={}
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
