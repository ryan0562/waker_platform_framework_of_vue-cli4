/**
 * form.validateFields 的async写法
 * @param {Object} antd的Form.create 实例
 * @param  {...any} form.validateFields方法除了最后个回调的全部参数
 * @return {Array} form.validateFields的callback的入参的数组结构
 */
// eslint-disable-next-line promise/param-names
export const asyncValidateFields = (form, ...args) => new Promise(r => form.validateField(...args, (...p) => r([...p])))
