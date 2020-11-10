/*
 * @Description: 
 * @Autor: Waker
 * @Date: 2020-11-10 17:19:05
 * @LastEditors: Waker
 * @LastEditTime: 2020-11-10 19:47:08
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
                limit: 10240
            }))
        /* 将image改成base64 end*/
        /* 添加文件夹别名 start */
        config.resolve.alias
            .set('@', resolve('./src'))
            .set('@public', resolve('./public'))
        /* 添加文件夹别名 end */
    }

}