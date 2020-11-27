/*
 * @Description: 
 * @Autor: Waker
 * @Date: 2020-11-10 17:06:05
 * @LastEditors: Waker
 * @LastEditTime: 2020-11-17 16:18:36
 */
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
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */'../views/home'),
    meta: {
      title: '欢迎页'
    }
  },
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
  {
    path: '*', redirect: '/404', hidden: true,
  },
];

/* 权限路由 */
let permissionRouterList = [
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: () => import('../views/login/Login.vue')
  // },
  {
    path: '/icon',
    name: 'icon',
    component: () => import('../views/testPage/icon.vue')
  },
]
export {
  defaultRouterList,
  permissionRouterList,
}