/*
 * @Description: 
 * @Autor: Waker
 * @Date: 2020-11-10 17:05:10
 * @LastEditors: Waker
 * @LastEditTime: 2020-11-10 20:53:32
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router/default'
import store from './store'

Vue.config.productionTip = false

/* 全局注册iconfont */
import iconfont from '@/components/iconfont' //iconfont图标组件
Vue.component('Iconfont', iconfont)

/* vue实例化 */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
