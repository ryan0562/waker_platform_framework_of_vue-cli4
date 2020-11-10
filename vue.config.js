/*
 * @Description: 
 * @Autor: Waker
 * @Date: 2020-11-10 17:19:05
 * @LastEditors: Waker
 * @LastEditTime: 2020-11-10 20:36:55
 */

const path = require('path')
// const webpack = require('webpack')


function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    chainWebpack: config => {
        /* 将image改成base64 start*/
        config.module
            .rule('images')
            .use('url-loader')
            .loader('url-loader')
            .tap(options => Object.assign(options, {
                limit: 10240, // 设置最大10kb
            }))
        /* 将image改成base64 end*/
        /* 添加文件夹别名 start */
        config.resolve.alias
            .set('@', resolve('./src'))
            .set('@public', resolve('./public'))
        /* 添加文件夹别名 end */
    },
    
    devServer: {
        /* 端口 */
        port: 9999,
        /* 代理 */
        proxy: {
          '/api/sso': {
            target: process.env.VUE_APP_SSO,
            changeOrigin: true, // 接口跨域
            pathRewrite: { '^/api/sso': '/sso' },
          },
          '/api/uploadFiles': {
            target: process.env.VUE_APP_UPLOADFILES,
            changeOrigin: true, // 接口跨域
            pathRewrite: { '^/api/uploadFiles': '' },
          },
          '/api': {
            target: process.env.VUE_APP_OPENAPI,
            secure: false, // HTTPS接口,配置这个
            changeOrigin: true, // 接口跨域
            pathRewrite: { '^/api': '' },
          },
        },
      },

}