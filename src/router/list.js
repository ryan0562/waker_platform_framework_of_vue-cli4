import { BasicLayout,PageView } from '@/layout'
/**
 * @description:  特殊路由字段描述
 * @param {
  *    hideChildrenInMenu: Boolean , // 强制显示 MenuItem 而不是 SubMenu
  *    meta {
  *      keepAlive: Boolean, // 是否缓存
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
    component: () => import('@/views/login/Login'),
    hidden: true,
  },
  {
    path: '/404',
    component: () => import('@/views/error/404'),
    hidden: true,
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
        meta: { title: '财务管理', icon: 'iconT-caiwuguanli', permission: ['finance'] },
        children: [
          {
            path: 'user-account',
            name: 'userAccount',
            component: () => import('@/views/hasPermission/list.vue'),
            meta: { title: '用户账户管理', permission: ['finance_user-account'] },
          },
          {
            path: 'user-account/:accountId',
            name: 'userAccountDetails',
            component: () => import('@/views/hasPermission/list.vue'),
            hidden: true,
            meta: { title: '账户明细', permission: ['finance_user-account_details'] },
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
      {
        path: '/noPermission',
        name: 'noPermission',
        component: () => import('@/views/noPermission/list.vue'),
        meta: {
          title: '非权限页面',
          icon: 'table',
        },
      },
    ]
  },
]
export {
  defaultRouterList,
  permissionRouterList,
}