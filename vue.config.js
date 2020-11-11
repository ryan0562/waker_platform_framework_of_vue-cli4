/*
 * @Description: 
 * @Autor: Waker
 * @Date: 2020-11-10 17:19:05
 * @LastEditors: Waker
 * @LastEditTime: 2020-11-11 19:20:21
 */

const path = require('path')
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const isProd = process.env.NODE_ENV === 'production'

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  chainWebpack: config => {
    /* 打包分析 */
    if (isProd) {
      config.plugin("webpack-report").use(BundleAnalyzerPlugin, [{
        analyzerPort: 9998,
      }]);
    }
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
    // config.resolve.symlinks(true)
  },

  devServer: {
    /* 域名设置 =>外部可访问 */
    host: '0.0.0.0',
    /* 默认用谷歌浏览器打开 */
    // open: 'Google Chrome',
    /* 端口 */
    port: 9999,
    /* 代理 */
    proxy: {
      '/api/sso': {
        target: process.env.VUE_APP_SSO,
        changeOrigin: true, // 接口跨域
        pathRewrite: {
          '^/api/sso': '/sso'
        },
      },
      '/api/uploadFiles': {
        target: process.env.VUE_APP_UPLOADFILES,
        changeOrigin: true, // 接口跨域
        pathRewrite: {
          '^/api/uploadFiles': ''
        },
      },
      '/api': {
        target: process.env.VUE_APP_OPENAPI,
        secure: false, // HTTPS接口,配置这个
        changeOrigin: true, // 接口跨域
        pathRewrite: {
          '^/api': ''
        },
      },
    },
  },

  // eslint-loader 是否在保存的时候检查
  // lintOnSave: 'error',
  // 生产环境 sourceMap
  productionSourceMap: false,
  css: {
    // 是否构建样式地图，false 将提高构建速度   正式环境开启
    sourceMap: isProd ? false : true,
  }
}