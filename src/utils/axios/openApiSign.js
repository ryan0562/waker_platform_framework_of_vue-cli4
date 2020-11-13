/*
 * @Description:
 * @Autor: Waker
 * @Date: 2020-07-17 14:46:56
 * @LastEditors: Waker
 * @LastEditTime: 2020-07-17 17:12:40
 */
// import { enc, HmacSHA256 } from 'crypto-js'; // https://github.com/rollup/rollup-plugin-commonjs/issues/266
// const { Base64 } = enc;

/* eslint-disable */

import HmacSHA256 from 'crypto-js/hmac-sha256'
import Base64 from 'crypto-js/enc-base64'

const globalEncodeURIComponent = encodeURIComponent

const jsonStringify = (val) => (val instanceof Object ? JSON.stringify(val) : val)

const signatureConfig = {
  signatureMethod: 'HMAC-SHA256',
  signatureVersion: '1.0',
}

const encAndRep = (key) => {
  if (key === '' || key === undefined || key === null) {
    return ''
  }
  return globalEncodeURIComponent(key)
    .replace(/\+/g, '%20')
    .replace(/\*/g, '%2A')
    // .replace("%7E", "~")
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/!/g, '%21')
    .replace(/\)/g, '%29')
}

/**
 * 签名算法
 */
const signatureIt = (jsonObject, secret, method) => {
  var meth = method
  var str
  var arr = []

  for (var key in jsonObject) {
    if (key === 'access_token' || key === 'parameter') { continue }
    if ({}.hasOwnProperty.call(jsonObject, key)) {
      arr.push(encAndRep(key) + '=' + encAndRep(jsonStringify(jsonObject[key])))
    }
  }
  var str2 = arr.sort().join('&')

  str = meth + '&' + '%2F' + '&' + encAndRep(str2).replace(/\~/g, '%7E')
  str = Base64.stringify(HmacSHA256(str, secret + '&'))
  return str
}

function generate (opt, httpMethod, accessKeyId, accessKeySecret, timestamp = new Date().getTime()) {
  const param = {
    ...signatureConfig,
    accessKeyId,
    timestamp,
  }
  for (let key in opt) {
    if (Object.prototype.hasOwnProperty.call(opt, key)) {
      if (opt[key] !== undefined && opt[key] !== null) {
        param[key] = opt[key]
      }
    }
  }
  param.signKey = JSON.stringify(opt.parameter)
  param.signature = signatureIt(param, accessKeySecret, httpMethod)

  return param
}

function stringify (param) {
  return Object.keys(param)
    .map((key) => {
    return `${key}=${globalEncodeURIComponent(jsonStringify(param[key]))}`
  }).join('&')
}

export default {
  signatureIt,
  generate,
  stringify,
}
