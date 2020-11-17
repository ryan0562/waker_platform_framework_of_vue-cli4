/*
 * @Description: 
 * @Autor: Waker
 * @Date: 2020-11-17 10:45:31
 * @LastEditors: Waker
 * @LastEditTime: 2020-11-17 11:03:26
 */
import Vue from 'vue'
import VueCookies from 'vue-cookies'
// https://www.npmjs.com/package/vue-cookies

Vue.use(VueCookies)

// 配置默认值
Vue.$cookies.config('1d')
