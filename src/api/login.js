/*
 * @Description: 
 * @Autor: Waker
 * @Date: 2020-11-13 13:41:34
 * @LastEditors: Waker
 * @LastEditTime: 2020-11-13 13:41:55
 */

// 接口文档：http://223.223.223.242:8118/energy-authserver-server/swagger-ui.html

import { axios } from '@/utils/axios/request'

const api = {
  smsCaptchaLogin: '/api/sso/phoneCodeLogin',
  imgCaptchaLogin: '/api/sso/imageLogin',
  getSmsCpatcha: '/api/sso/captcha/sms',
  logout: '/api/sso/loginOut',
  loginNoImgCaptcha: '/api/sso/passwordLogin',
}

// 图片验证码登录
export function imgCaptchaLogin (params) { 
  return axios({
    url: api.imgCaptchaLogin,
    method: 'post',
    params,
  })
}

// 短信验证码登录
export function smsCaptchaLogin (params) {
  return axios({
    url: api.smsCaptchaLogin,
    method: 'post',
    params,
  })
}

// 登录获取短信验证码
export function getSmsCpatcha (params) {
  return axios({
    url: api.getSmsCpatcha,
    method: 'get',
    params,
  })
}

// 退出登录
export function logout () {
  return axios({
    url: api.logout,
    method: 'get',
  })
}

// 手机号密码登录（跳过图片验证码）
export function loginNoImgCaptcha (params) {
  return axios({
    url: api.loginNoImgCaptcha,
    method: 'post',
    params,
  })
}
