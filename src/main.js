/*
 * @Description:
 * @Autor: Waker
 * @Date: 2020-11-10 17:05:10
 * @LastEditors: Waker
 * @LastEditTime: 2020-11-17 13:09:20
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/* 通用样式 */
import '@/style/index.less' 

/* 权限控制 */
import '@/router/permission' // permission control

/* 引入全局样式 */
import '@/style/index.less'

// 注册后 Vue.$http and this.$http
import {VueAxios} from './utils/axios/request'
Vue.use(VueAxios)

/* cookies */
import '@/utils/cookies.js'

/* vue.ls本地缓存持久化 */
import '@/utils/vue_ls.js'

/* 全局注册antd */
import 'ant-design-vue/dist/antd.css'
import antd from 'ant-design-vue'
Vue.use(antd)

/* 减少一些vue在生产环境中的提示开销 */
Vue.config.productionTip = false

/* vue原型添加映射表map */
import map from '@/utils/map/map.js'
Vue.prototype.$map = map

/* 全局注册iconfont */
import iconfont from '@/components/Giconfont' // iconfont图标组件
Vue.component('Iconfont', iconfont)

/* 生成环境启动devtools */
Vue.config.devtools = true;

/* 正则全局 */
import regExp from '@/utils/regExp'
Vue.prototype.$regExp = regExp

/* vue实例化 */
const app = new Vue({
  router: router,
  store,
  render: h => h(App)
}).$mount('#app')

/* 生成环境启动devtools */
window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app.constructor