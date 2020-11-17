/*
 * @Description: 
 * @Autor: Waker
 * @Date: 2020-11-17 09:56:53
 * @LastEditors: Waker
 * @LastEditTime: 2020-11-17 10:17:48
 */
export default {
  //部分 字母、数字、+*-/_三种中的两种组成
  part_letterNumberSymbol:/^(([0-9]+[a-zA-Z]+)|([0-9]+[\/\*\-\+\_]+)|([a-zA-Z]+[0-9]+)|([a-zA-Z]+[\/\*\-\+\_]+)|([\/\*\-\+\_]+[a-zA-Z]+)|([\/\*\-\+\_]+[0-9]+))([a-zA-Z]*[\/\*\-\+\_]*[0-9]*)+$/,
  //必须 字母、数字
  required_letterNumber:/^(?=.*[0-9])(?=.*[a-zA-Z])(.{2,})$/,
  //只能 字母、数字
  can_numberAndletter:/^[A-Za-z0-9]+$/,
  //只能 字母、汉字
  can_numberAndletter:/^[a-zA-Z\u4e00-\u9fa5]+$/,
  //只能 汉字、字母、数字
  can_letterNumberChinese: /^[A-Za-z0-9\u4e00-\u9fa5]+$/,

  // 手机号正则，用途例如：验证手机号
  phone: /^1\d{10}$/,
  // 微信号码
  wechat: /^[a-zA-Z]([-_a-zA-Z0-9]{5,20})+$/,
  // 邮箱正则
  email: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
}
