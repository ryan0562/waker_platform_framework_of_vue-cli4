/*
 * @Description: 
 * @Autor: Waker
 * @Date: 2020-11-10 17:06:05
 * @LastEditors: Waker
 * @LastEditTime: 2020-11-13 14:45:14
 */


const defaultRouterList = [{
  path: '/',
  name: 'home',
  component: () => import('../views/testPage/index.vue')
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


export default defaultRouterList