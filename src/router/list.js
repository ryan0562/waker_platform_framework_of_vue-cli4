import { BasicLayout } from '@/layout'
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
    component: BasicLayout,
    redirect: '/zh',
    children: [
      // zh
      {
        path: '/zh',
        name: 'zh',
        component: () => import('@/views/zh/list.vue'),
        meta: {
          title: '中恒通用页面',
          icon: 'table',
        },
      },
    ]
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
 
  {
    path: '/icon',
    name: 'icon',
    component: () => import('../views/testPage/icon.vue'),
    meta: {
      permission: ['orders_top-up'],
      title: '随便测试',
      keepAlive: true,
    }
  },
  {
    path: '/icon2',
    name: 'icon2',
    component: () => import('../views/testPage/icon2.vue'),
    meta: {
      permission: ['alarm_alarmRule'],
    }
  },
]
export {
  defaultRouterList,
  permissionRouterList,
}