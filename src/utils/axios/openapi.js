import { axios } from './request'
import openApi from '@/utils/axios/openApiSign'
import store from '@/store'
import router from '@/router'

/**
 * @description:
 * @param {
  url: '/userCenter', // 服务体系
  proxy:'/api', //反向代理的索引字符串,默认''/api'
  version: '1.0', // 版本号:默认1.0
  action: api.twoStepCode, // 业务服务接口
  method: 'post', // 不写默认post
  paramsType: 'params', // axios传参方式 params:url后带参形式, data:json形式 ,不写默认params,
  data: parameter, // 业务参数
  timeout: 6000, // 超时参数 单位:毫秒
}
 * @author: Waker
 */
export function getData ({ serve, action, parameter = {}, version = '1.0', proxy = '/api', method = 'post', timeout, headers }) {
  let url = `${proxy}${serve}/${action}`
  if (serve.indexOf('http') === 0) {
    url = serve
  }
  const obj = {
    url,
    method,
    proxy,
    data: {
      parameter,
      action,
      version,
    },
  }
  // 签名
  const idKey = {
    accessKeyId: '6c946c4d6f19e940', // 根据项目固定
    secretKey: 'ohxxzR8x3ssekBJUPmCmFAZPsIYhVXsuAFSDYN7xSEw=', // 根据项目固定
  }
  obj.data = openApi.generate(obj.data, 'POST', idKey.accessKeyId, idKey.secretKey)

  // 超时设置
  if (timeout) {
    obj.timeout = timeout
  }
  // headers设置
  if (headers) {
    obj.headers = headers
  }

  return new Promise((resolve, reject) => {
    axios(obj).then(res => {
      if (res.code && res.code === '1001') { // 登录超时，token失效
        store.dispatch('Logout').then(() => {
          router.push({
            path: '/login',
          })
        })
        reject(new Error('登录超时'))
      } else {
        resolve(res)
      }
    }).catch(err => {
      reject(err)
    })
  })
}

export default getData
