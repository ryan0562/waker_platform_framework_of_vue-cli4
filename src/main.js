/*
 * @Description: 
 * @Autor: Waker
 * @Date: 2020-11-10 17:05:10
 * @LastEditors: Waker
 * @LastEditTime: 2020-11-12 17:07:06
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router/default'
import store from './store'
/* 引入全局样式 */
import '@/style/index.less'

/* 全局注册antd */
import 'ant-design-vue/dist/antd.css'
import antd from "ant-design-vue"
Vue.use(antd)
/* 减少一些vue在生产环境中的提示开销 */
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