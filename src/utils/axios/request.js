import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
import { ACCESS_TOKEN } from '@/store/mutation-types'
// 签名
// import creatSign from './sign'
import openApi from './openApiSign'
// 创建 axios 实例

// 签名
const idKey = {
  accessKeyId: '6c946c4d6f19e940', // 根据项目固定
  secretKey: 'ohxxzR8x3ssekBJUPmCmFAZPsIYhVXsuAFSDYN7xSEw=', // 根据项目固定
}
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
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
  const token = Vue.ls.get(ACCESS_TOKEN) || 'web4090824576ea4dde9e26f1a3277a7672'
  if (token) {
    config.headers['Authorization'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  /* end  输出baseUrl到header */
  console.log(process.env)
  return config
})

// response interceptor
service.interceptors.response.use((response) => {
  return response.data
}, err)

const installer = {
  vm: {},
  install(Vue) {
    Vue.use(VueAxios, service)
  },
}

/**
  @description: 通用接口使用函数
  @param {
    url: '/userCenter', // 服务体系
    proxy:'/api', //反向代理的索引字符串,默认''/api'
    version: '1.0', // 版本号:默认1.0
    action: api.twoStepCode, // 业务服务接口
    method: 'post', // 不写默认post
    paramsType: 'params', // axios传参方式 params:url后带参形式, data:json形式 ,不写默认params,
    data: parameter, // 业务参数
    timeout: 6000, // 超时参数 单位:毫秒
  }
  @return: axios实例
  @author: Waker
 **/
function gAxios(data) {
  let url = `${data.proxy || '/api'}${data.url}/${data.action}`
  if (data.url.indexOf('http') === 0) {
    url = data.url
  }
  let obj = {
    url,
    method: data.method || 'post',
    proxy: data.proxy || '/api',
    data: {
      parameter: data.data,
      action: data.action,
      version: data.version || '1.0',
    },

  }
 
  obj.data = openApi.generate(obj.data, 'POST', idKey.accessKeyId, idKey.secretKey)

  // 超时设置
  if (data.timeout) {
    obj.timeout = data.timeout
  }
  // headers设置
  if (data.headers) {
    obj.headers = data.headers
  }
  return service(obj)
}
export {
  installer as VueAxios,
  service as axios,
  gAxios,
}
