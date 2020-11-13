/*
 * @Description:
 * @Autor: Waker
 * @Date: 2020-05-26 14:48:05
 * @LastEditors: Waker
 * @LastEditTime: 2020-11-13 13:57:31
 */
// "eslintConfig": {
//   "root": true,
//   "env": {
//     "node": true
//   },
//   "extends": [
//     "plugin:vue/essential",
//     "eslint:recommended"
//   ],
//   "parserOptions": {
//     "parser": "babel-eslint"
//   },
//   "rules": {}
// },
module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    sourceType: 'module',
    "ecmaVersion": 6,
    // parser: "vue-eslint-parser",
    parser: 'babel-eslint',
  },
  plugins: ['vue', 'html'],
  env: {
    node: true,
    es6: true, // 启用 ES6 语法支持以及新的 ES6 全局变量或类型
    browser: true // 浏览器全局变量
  },
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    indent: [2, 2] // 强制使用一致的缩进
  },

}