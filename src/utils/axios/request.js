/*
 * @Description:
 * @Autor: Waker
 * @Date: 2020-06-08 20:05:28
 * @LastEditors: Waker
 * @LastEditTime: 2020-11-17 17:37:15
 */
import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import notification from 'ant-design-vue/es/notification'
import {VueAxios} from './axios'
import {ACCESS_TOKEN} from '@/store/mutation-types'
// 创建 axios 实例
const service = axios.create({
  baseURL: '', // api base_url
  timeout: 6000, // 请求超时时间
})
const err = (error) => {
  if (error.response) {
    const data = error.response.data
    const token = Vue.ls.get(ACCESS_TOKEN)
    if (error.response.status === 403) {
      notification.error({
        message: '禁止',
        description: data.message,
      })
    }
    if (process.env.NODE_ENV !== 'development') {
      if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
        notification.error({
          message: '未授权',
          description: '授权验证失败',
        })
        if (token) {
          store.dispatch('Logout').then(() => {
            setTimeout(() => {
              window.location.reload()
            }, 1500)
          })
        }
      }
    }
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
  const token = Vue.ls.get(ACCESS_TOKEN)
  if (token) {
    config.headers[ACCESS_TOKEN] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config
})

// response interceptor
service.interceptors.response.use((response) => {
  return response.data
}, err)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, service)
  },
}
export {
  installer as VueAxios,
  service as axios,
}
