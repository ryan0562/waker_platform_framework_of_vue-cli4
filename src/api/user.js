// 查询用户下的权限列表
import { gAxios } from '@/utils/axios/request'


export function getPermissionByUserId(parameter) {
  return gAxios({
    url: '/userCenter', // 服务体系
    // proxy: '/authApi', // 反向代理的索引字符串,默认''/api'
    action: 'selectUserPermissionVOList', // 业务服务接口
    data: parameter, // 业务参数
    // version: '1.0', // 版本号:默认1.0
    // method: 'post', // 不写默认post
    // paramsType: 'data', // axios传参方式 params:url后带参形式, data:json形式 ,不写默认params,
  })
}

export function getUserInfo(parameter) {
  return gAxios({
    url: '/userCenter', // 服务体系
    action: 'getMeBySaas', // 业务服务接口
    data: parameter, // 业务参数
  })
}
