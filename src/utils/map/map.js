/*
 * @Description:
 * @Autor: Waker
 * @Date: 2020-06-04 14:05:14
 * @LastEditors: Waker
 * @LastEditTime: 2020-11-10 20:51:12
 */
import errCode from './errCode.js'
export default {
  ...errCode,
  pagination: {
    pageSizeArr: ['10', '20', '50', '100'],
    pageSize: 20,
  },
}
