/*
 * @Description: 
 * @Autor: Waker
 * @Date: 2020-11-10 17:06:05
 * @LastEditors: Waker
 * @LastEditTime: 2020-11-16 09:43:28
 */

export default {
  defaultRouterList : [
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: () => import('@/views/login/Login'),
    //   hidden: true,
    // },
    {
      path: '/404',
      component: () => import( '@/views/exception/404'), 
    },
  ],
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