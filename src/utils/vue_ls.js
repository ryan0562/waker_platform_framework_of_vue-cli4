/*
 * @Description: 
 * @Autor: Waker
 * @Date: 2020-11-13 14:35:49
 * @LastEditors: Waker
 * @LastEditTime: 2020-11-13 14:52:32
 */
import Vue from 'vue';
import Storage from 'vue-ls';
 
const storageOptions = {
  namespace: 'vuels__', // key键前缀
  name: 'ls', // 命名Vue变量.[ls]或this.[$ls],
  storage: 'local', // 存储名称: session, local, memory
}
Vue.use(Storage, storageOptions);
