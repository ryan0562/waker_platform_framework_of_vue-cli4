/*
 * @Description: 
 * @Autor: Waker
 * @Date: 2020-11-10 17:06:05
 * @LastEditors: Waker
 * @LastEditTime: 2020-11-16 19:25:08
 */

export default {
  /* 公共访问路由 */
  defaultRouterList : [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/Login'),
      hidden: true,
    },
    {
      path: '/404',
      component: () => import( '@/views/error/404'), 
      hidden: true,
    },
    {
      path: '*', redirect: '/404', hidden: true,
    },
  ],
  /* 权限路由 */
  permissionRouterList : [{
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "404" */'../views/home/index.vue')
  },
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
}