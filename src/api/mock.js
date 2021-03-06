//测试mock
import { gAxios } from '@/utils/axios/request'


export function selectDataRoleList(parameter) {
  return gAxios({
    url: '/mock/roleManagerService', // 服务体系
    // proxy: '/authApi', // 反向代理的索引字符串,默认''/api'
    action: 'selectDataRoleList', // 业务服务接口
    data: parameter, // 业务参数
    // version: '1.0', // 版本号:默认1.0
    // method: 'post', // 不写默认post
    // paramsType: 'data', // axios传参方式 params:url后带参形式, data:json形式 ,不写默认params,
  })
}
