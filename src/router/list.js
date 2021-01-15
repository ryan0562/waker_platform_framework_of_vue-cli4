import { BasicLayout,PageView } from '@/layout'
import { loginModel } from '@/config'
/**
 * @description:  特殊路由字段描述
 * @param {
  *    hideChildrenInMenu: Boolean , // 强制显示 MenuItem 而不是 SubMenu
  *    meta {
  *      keepAlive: Array, // 缓存的组件name(需要保持路由name跟组件name一致才会生效) , 如果是[],则进入任何页面都缓存
  *      permission: Array , // 权限数组
  *      icon: String, // icon字体
  *      title:String,//标题
  *      subTitle:String,//次级标题
  *      headerSubTitle: String, // logo小标题文字
  *    }
  * }
  * @return:
  * @author: Waker
  */

/* 公共访问路由 */
let defaultRouterList = [
  {
    path: '/login',
    name: 'login',
    component: () => {
      // 这里处理的好处是本地没有创建login组件页面,无法直接输入url在本地登录
      if(loginModel==='in'){
        return import('@/views/login/Login')
      } else {
        return import('@/views/login/toLoginCenter')
      }
    },
    hidden: true,
  },
  {
    path: '/404',
    component: () => import('@/views/error/404'),
    hidden: true,
  },
  {
    path: '/noPermission',
    name: 'noPermission',
    component: () => import('@/views/noPermission/list.vue'),
    meta: {
      title: '非权限页面',
      icon: 'table',
    },
  },
  // {
  //   path: '*', redirect: '/404', hidden: true,
  // },
];

/* 权限路由 */
let permissionRouterList = [
  {
    path: '/',
    name: 'home',
    component: BasicLayout,
    redirect: '/hasPermission',
    meta:{
      title:'首页'
    },
    children: [
      {
        path: '/finance',
        name: 'finance',
        component: PageView,
        redirect: '/finance/user-account',
        meta: { title: '财务管理', icon: 'iconT-caiwuguanli'},
        children: [
          {
            path: 'user-account',
            name: 'userAccount',
            component: () => import('@/views/hasPermission/list.vue'),
            meta: { title: '用户账户管理',keepAlive:['userAccountDetails','no']  },
          },
          {
            path: 'user-account/2',
            name: 'userAccountDetails',
            component: () => import('@/views/hasPermission/detail.vue'),
            // hidden: true,
            
            meta: { title: '账户明细' },
          },
          {
            path: 'user-account/3',
            name: 'no',
            component: () => import('@/views/hasPermission/no.vue'),
            // hidden: true,
            
            meta: { title: '211',keepAlive:[]},
          },
          {
            path: 'user-account/4',
            name: 'nnn',
            component: () => import('@/views/hasPermission/nnn.vue'),
            meta: { title: '333'},
          },
        ],
      },
      // zh
      {
        path: '/hasPermission',
        name: 'hasPermission',
        component: () => import('@/views/hasPermission/list.vue'),
        meta: {
          title: '权限页面',
          icon: 'table',
        },
        children:[
          {
            path: '/hasPermission/1',
            name: 'noPermission_1',
            component: () => import('@/views/noPermission/list.vue'),
            meta: {
              title: '非权限页面',
              icon: 'table',
            },
          },
        ]
      },
      
    ]
  },
]
export {
  defaultRouterList,
  permissionRouterList,
}