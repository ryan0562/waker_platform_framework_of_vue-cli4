/*
 * @Description: 
 * @Autor: Waker
 * @Date: 2020-11-10 17:19:05
 * @LastEditors: Waker
 * @LastEditTime: 2020-11-10 20:28:20
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
        port: 3500,
        /* 代理 */
        proxy: {
          '/api/sso': {
            target: process.env.VUE_APP_SSO,
            // target: 'http://116.62.118.3:11001/', // 测试环境
            // target: 'http://223.223.223.242:11001/',
            changeOrigin: true, // 接口跨域
            pathRewrite: { '^/api/sso': '/sso' },
          },
          '/api/uploadFiles': {
            target: process.env.VUE_APP_UPLOADFILES,
            // target: 'http://116.62.118.3:11001/', // 测试环境
            // target: 'http://223.223.223.242:11001/',
            changeOrigin: true, // 接口跨域
            pathRewrite: { '^/api/uploadFiles': '' },
          },
          '/api': {
            target: process.env.VUE_APP_OPENAPI,
            // target: 'http://116.62.118.3:11002/', // 测试环境
            // target: 'http://223.223.223.242:11002/',
            // ws: false,
            secure: false, // HTTPS接口,配置这个
            changeOrigin: true, // 接口跨域
            pathRewrite: { '^/api': '' },
          },
        },
      },

}