/*
 * @Description: 
 * @Autor: Waker
 * @Date: 2020-11-16 19:38:14
 * @LastEditors: Waker
 * @LastEditTime: 2020-11-17 10:24:19
 */
import Vue from 'vue'
import { logout, imgCaptchaLogin, smsCaptchaLogin, loginNoImgCaptcha } from '@/api/login'
import { getPermissionByUserId, getUserInfo } from '@/api/user'
import { ACCESS_TOKEN } from '@/store/mutation-types'

export default {
  state: {
    token: '',
    permissionList: [],
    company: {},
    info: {},
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
    //  设置公司ID
    SET_COMPANYID: (state, data) => {
      state.company.id = parseInt(data)
    },

    SET_USER: (state, info) => {
      state.info = info
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
    GetPermission({ commit, state }, { userId, companyId }) {
      return new Promise((resolve, reject) => {
        getPermissionByUserId({
          saaSPermissionQuery: {
            userId,
            companyId,
            platformId: 5,
          },
        }).then(res => {
          if (res.code !== null) {
            reject(res)
            return
          }
          commit('SET_PERMISSIONLIST', res.dataList)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 设置token
    SetToken({ commit }, token) {
      return new Promise(resolve => {
        commit('SET_TOKEN', token)
        resolve()
      })
    },
    // 设置公司信息
    SetCompanyId({ commit }, id) {
      return new Promise((resolve) => {
        commit('SET_COMPANYID', id)
        resolve()
      })
    },
    // 获取用户信息
    GetInfo({ commit, state }, companyId = state.company.id) {
      return new Promise((resolve, reject) => {
        getUserInfo({
          companyId,
        }).then(res => {
          if (res.code !== null) {
            reject(res)
            return
          }
          const result = res.data
          commit('SET_USER', result)
          resolve(res)
        }).catch(err => reject(err))
      })
    },
    // 设置跟获取所有用户相关信息
    SetUserInfo({ dispatch, commit, state }, { companyId, token }) {
      dispatch('SetToken', token)
      dispatch('SetCompanyId', companyId)

      return new Promise((resolve, reject) => {
        dispatch('GetInfo').then(preRes => {
          dispatch('GetPermission', { userId: state.info.id, companyId: state.company.id }).then(res => {
            resolve(res)
          }).catch(err => reject(err))

        }).catch(err => reject(err))
      })
    }
  },
}

