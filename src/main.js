/*
 * @Description: 
 * @Autor: Waker
 * @Date: 2020-11-10 17:05:10
 * @LastEditors: Waker
 * @LastEditTime: 2020-11-10 20:59:08
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router/default'
import store from './store'

Vue.config.productionTip = false
/* vue原型添加映射表map */
import map from '@/utils/map/map.js'
Vue.prototype.$map = map

/* 全局注册iconfont */
import iconfont from '@/components/iconfont' //iconfont图标组件
Vue.component('Iconfont', iconfont)

/* vue实例化 */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')