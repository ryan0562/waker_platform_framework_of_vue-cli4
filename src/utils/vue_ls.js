/*
 * @Description: 
 * @Autor: Waker
 * @Date: 2020-11-13 14:35:49
 * @LastEditors: Waker
 * @LastEditTime: 2020-11-13 14:53:38
 */
import Vue from 'vue';
import vueLs from 'vue-ls';
 
const storageOptions = {
  namespace: 'vuels__', // key键前缀
  name: 'ls', // 命名Vue变量.[ls]或this.[$ls],
  storage: 'local', // 存储名称: session, local, memory
}
Vue.use(vueLs, storageOptions);
