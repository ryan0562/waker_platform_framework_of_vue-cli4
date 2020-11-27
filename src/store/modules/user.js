/*
 * @Description: 
 * @Autor: Waker
 * @Date: 2020-11-16 19:38:14
 * @LastEditors: Waker
 * @LastEditTime: 2020-11-17 10:24:19
 */
import Vue from 'vue'
import { logout, imgCaptchaLogin, smsCaptchaLogin, loginNoImgCaptcha } from '@/api/login'
import { getPermissionByUserId } from '@/api/user'
import { ACCESS_TOKEN } from '@/store/mutation-types'


const user = {
  state: {
    token: '',
    info: {},
    permissionList: [],
  },

  mutations: {
    // 设置token
    SET_TOKEN: (state, data) => {
      state.token = data
    },
    // 设置用户权限列表
    SET_PERMISSIONLIST: (state, data) => {
      state.permissionList = data
    },
  },

  actions: {
    // 登录
    Login({ commit }, { type, ...params }) {
      return new Promise((resolve, reject) => {
        let ax = ''
        switch (type) {
        case 'sms':
          ax = smsCaptchaLogin
          break;
        case 'img':
          ax = imgCaptchaLogin
          break;
        case 'pwd':
          ax = loginNoImgCaptcha
          break;
        }
        ax(params).then(response => {
          if (!response.code) {
            const result = response.data
            Vue.ls.set(ACCESS_TOKEN, result, 7 * 24 * 60 * 60 * 1000)
            commit('SET_TOKEN', result)
            resolve()
          } else {
            reject(response)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    Logout({ commit, state }) {
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        }).finally(() => {
          commit('SET_TOKEN', '')
          Vue.ls.remove(ACCESS_TOKEN)
        })
      })
    },
    // 获取路由权限
    GetPermission({ commit }, { userId, companyId }) {
      return new Promise((resolve, reject) => {
        getPermissionByUserId({
          saaSPermissionQuery: {
            userId,
            companyId,
            platformId: 5,
          },
        }).then(res => {
          if (res.success) {
            commit('SET_PERMISSIONLIST', res.dataList)
            resolve(res)
          } else {
            reject(res)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
  },
}

export default user
