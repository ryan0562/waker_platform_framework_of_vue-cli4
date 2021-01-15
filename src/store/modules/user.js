/*
 * @Description: 
 * @Autor: Waker
 * @Date: 2020-11-16 19:38:14
 * @LastEditors: Waker
 * @LastEditTime: 2020-11-17 10:24:19
 */
import Vue from 'vue'
import router from '@/router'
import { logout, imgCaptchaLogin, smsCaptchaLogin, loginNoImgCaptcha } from '@/api/login'
import { getPermissionByUserId, getUserInfo, getSystemUrlMap } from '@/api/user'
import { defaultRouterList, permissionRouterList } from '@/router/list'



// 判断权限
function hasPermission(permissionList, route) {
  // 有permission去判断是否在返回的列表内,没有直接返回true
  if (route.meta?.permission) {
    for (let i = 0, len = permissionList.length; i < len; i++) {
      const { id, uri } = permissionList[i]
      // 是否匹配
      if (route.meta.permission.includes(uri)) {
        /* 将tab，按钮权限添加到路由meta配置中 */
        let tabs = []
        let btns = []
        permissionList.forEach(item => {
          if (item.pid === id) {
            switch (item.type) {
            // 按钮
            case 3:
              btns.push(item.uri)
              break;
              // tabs
            case 4:
              tabs.push(item.uri)
              // 获取tabs下的按钮权限
              permissionList.forEach(v => {
                if (v.pid === item.id) {
                  btns.push(v.uri)
                }
              })
              break;
            }
          }
        })
        route.meta.pagePermission = {
          tabs,
          btns,
        }
        return true
      }
    }
    return false
  }
  return true
}

// 过滤路由
function filterAsyncRouter(routerMap, permissionList) {
  const accessedRouters = routerMap.filter(route => {
    if (hasPermission(permissionList, route)) {
      if (route.children?.length) {
        route.children = filterAsyncRouter(route.children, permissionList)
      }
      return true
    }
    return false
  })
  return accessedRouters
}
/* 路由处理 */
function convertRoutes(nodes) {
  if (!nodes) return null
  nodes = JSON.parse(JSON.stringify(nodes))
  let queue = Array.isArray(nodes) ? nodes.concat() : [nodes]
  while (queue.length) {
    const levelSize = queue.length
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()
      if (!node.children || !node.children.length) continue
      node.children.forEach(child => {
        // 转化相对路径
        if (child.path[0] !== '/' && !child.path.startsWith('http')) {
          child.path = node.path.replace(/(\w*)[/]*$/, `$1/${child.path}`)
        }
      })
      queue = queue.concat(node.children)
    }
  }
  return nodes
}
// 查找默认路由
function findDefaultRoutePath(accessedRouters) {
  if (accessedRouters && accessedRouters.length) {
    // const routes = accessedRouters[0].children
    const routes = accessedRouters
    const route = convertRoutes(routes.find(item => item.path !== '/'))
    if (route) {
      if (route.children && route.children.length) {
        return route.children[0].path || '/'
      }
      return route.path || '/'
    } else {
      return '/404'
    }
  }
  return '/'
}

const INIT = ()=> {
  return {
    token: '',
    permissionList: [],
    companyId: '',
    info: {},
    _expires: '',
  }
}

export default {
  state: INIT(),
  mutations: {
    // 设置token
    SET_TOKEN: (state, data) => {
      state.token = data
      state._expires = new Date().getTime() + 1000 * 60 * 60 * 24
    },
    // 设置用户权限列表
    SET_PERMISSIONLIST: (state, data) => {
      state.permissionList = data
    },
    //  设置公司ID
    SET_COMPANYID: (state, data) => {
      state.companyId = parseInt(data)
    },
    // 设置用户信息
    SET_USER: (state, info) => {
      state.info = info
    },
    // 设置路由
    SET_ROUTERS: (state, routers = []) => {
      // state.addRouters = routers
      state.routers = [
        ...routers.concat(defaultRouterList),
        {
          path: '*', redirect: '/404', hidden: true,
        }
      ]
      // state.routers = routers
      // router.addRoutes(routers)
    },
    // 设置初始化打开页面
    SET_DEFAULTACCESSROUTE: (state, route) => {
      state.defaultAccessRoute = route
    },
    // 设置菜单
    SET_MEMU: (state, data) => {
      state.menu = data
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
            /* TODO设置为124,方便开发 */
            commit('SET_COMPANYID', 124)
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
    Logout({ commit, state,rootState }, code) {
      // 非登录超时 和 token存在 才会调用接口
      if (code !== '1001' && state.token) {
        logout(state.token)
      }
      // 情况用户数据
      rootState.user = INIT()
      localStorage.removeItem('vuex-along')

      // fix:hash模式在login页面时 url无法输入任何路径
      if(router.currentRoute.name === 'login'){
        location.reload();
      } else {
        router.replace('/login');
      }
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
            reject('获取用户权限失败')
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
    GetInfo({ commit, state }, companyId = state.companyId) {
      return new Promise((resolve, reject) => {
        getUserInfo({
          companyId,
        }).then(res => {
          if (res.code !== null) {
            reject('获取用户信息失败')
            return
          }
          const result = res.data
          commit('SET_USER', result)
          resolve(res)
        }).catch(err => reject(err))
      })
    },

    // 设置跟获取所有用户相关信息
    async SetUserInfo({ dispatch, commit, state }, { companyId = state.companyId, token = state.token }) {
      dispatch('SetToken', token)
      dispatch('SetCompanyId', companyId)
      // try保障不阻塞
      try {
        await dispatch('GetInfo')
        await dispatch('GetPermission', { userId: state.info.id, companyId: state.companyId })
        const GenerateRoutes = await dispatch('GenerateRoutes')
        return GenerateRoutes
      } catch (e) {
        throw new Error("构建权限失败,请检查相关接口");
      }

    },
    // 构建路由
    GenerateRoutes({ commit, state }, permissionList = state.permissionList) {
      const accessedRouters = filterAsyncRouter(permissionRouterList, permissionList)
      const defaultAccessRoute = findDefaultRoutePath(accessedRouters)
      const menu = accessedRouters.find(item => item.path === '/').children
      commit('SET_ROUTERS', accessedRouters)
      commit('SET_MEMU', menu)
      commit('SET_DEFAULTACCESSROUTE', defaultAccessRoute)
      // resolve(accessedRouters)
      return accessedRouters
    },
    // 获取系统url映射
    async getSystemUrl({ dispatch, commit, state }) {
      try {
        const res = await getSystemUrlMap({})
        const result = {}
        res.dataList.forEach(item => {
          result[item.id] = item.frontpath
        })
        // Vue.ls.set('systemUrlMap', result)
        // commit('SET_SYSTEMURL', result)
        Vue.ls.set('SystemUrlMap',result)
      } catch (e) {
        throw new Error("获取系统列表出错");
      }
    }
  },
}

