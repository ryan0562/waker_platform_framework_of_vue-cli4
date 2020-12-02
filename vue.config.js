/*
 * @Description:
 * @Autor: Waker
 * @Date: 2020-11-10 17:19:05
 * @LastEditors: Waker
 * @LastEditTime: 2020-11-13 16:53:29
 */

const path = require('path')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
/* 生产环境判断 */
// 可以改成!==来查看CDN是否执行
const isProd = process.env.NODE_ENV === 'production'

function resolve (dir) {
  return path.join(__dirname, dir)
}

const cdn = {
  externals: {
    // 业务使用示例 => key:包名  value:库文件对应的全局对象字符串=>可以冲源码最后获取
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    axios: 'axios',
    'ant-design-vue': 'antd',
    'vue-ls': 'VueStorage',
  },
  // import的css不要放进来,externals无法过滤掉
  css: [],
  js: [
    '//unpkg.com/vue@2.6.12/dist/vue.min.js',
    '//unpkg.com/vue-router@3.4.9/dist/vue-router.min.js',
    '//unpkg.com/vuex@3.5.1/dist/vuex.min.js',
    '//unpkg.com/axios@0.21.0/dist/axios.min.js',
    '//unpkg.com/ant-design-vue@1.7.2/dist/antd.min.js',
    '//unpkg.com/vue-ls@3.2.1/dist/vue-ls.min.js',
  ]
}

module.exports = {
  /* 过滤第三方包 减少打包体积  跟下面CDN配合*/
  configureWebpack: config => {
    config.externals = isProd ? cdn.externals : {}
  },
  chainWebpack: config => {
    /* 将CDN信息传到index.html内的htmlWebpackPlugin.options内 */
    if (isProd) {
      config.plugin('html').tap(args => {
        // html中添加cdn
        args[0].cdn = cdn
        return args
      })
    }

    /* 打包分析 */
    if (isProd) {
      config.plugin('webpack-report').use(BundleAnalyzerPlugin, [{
        analyzerMode: 'static',
        openAnalyzer: false,
        analyzerPort: 9998
      }])
    }
    /* 将image改成base64 start*/
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, {
        limit: 10240 // 设置最大10kb
      }))
    /* 添加文件夹别名 start */
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('@public', resolve('./public'))
    /* 删除moment语言包 */
    config
      .plugin('ignore')
      .use(
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn$/)
      )
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
        }
      },
      '/api/uploadFiles': {
        target: process.env.VUE_APP_UPLOADFILES,
        changeOrigin: true, // 接口跨域
        pathRewrite: {
          '^/api/uploadFiles': ''
        }
      },
      '/api/mock': {
        target: 'http://127.0.0.1:4523/mock/361268',
        secure: false, // HTTPS接口,配置这个
        changeOrigin: true, // 接口跨域
        pathRewrite: {
          '^/api/mock': ''
        }
      },
      '/api': {
        target: process.env.VUE_APP_OPENAPI,
        secure: false, // HTTPS接口,配置这个
        changeOrigin: true, // 接口跨域
        pathRewrite: {
          '^/api': ''
        }
      },
      
    }
  },

  // eslint-loader 是否在保存的时候检查
  // lintOnSave: 'error',
  // 生产环境 sourceMap
  productionSourceMap: false,
  css: {
    // 是否构建样式地图，false 将提高构建速度   正式环境开启
    sourceMap: !isProd
  }
}
