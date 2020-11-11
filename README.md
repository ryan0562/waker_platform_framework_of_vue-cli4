<!--
 * @Description: 
 * @Autor: Waker
 * @Date: 2020-11-10 17:05:29
 * @LastEditors: Waker
 * @LastEditTime: 2020-11-11 17:23:21
-->
<h1 align="center">waker's platform framework of vue-cli4</h1>
---

# 环境和依赖

- node
- yarn
- webpack
- eslint
- @vue/cli ~4
- [ant-design-vue](https://github.com/vueComponent/ant-design-vue) - Ant Design Of Vue 实现


> 请注意，我们强烈建议本项目使用 [Yarn](https://yarnpkg.com/) 包管理工具，这样可以与本项目演示站所加载完全相同的依赖版本 (yarn.lock) 。由于我们没有对依赖进行强制的版本控制，采用非 yarn 包管理进行引入时，可能由于 Pro 所依赖的库已经升级版本而引入了新版本所导致的问题。作者可能会由于时间问题无法及时排查而导致您采用本项目作为基项目而出现问题。


# CSS 相关

Vue CLI 项目天生支持 [PostCSS](http://postcss.org/)、[CSS Modules](https://github.com/css-modules/css-modules) 和包含 [Sass](https://sass-lang.com/)、[Less](http://lesscss.org/)、[Stylus](http://stylus-lang.com/) 在内的预处理器。

## 引用静态资源

所有编译后的 CSS 都会通过 [css-loader](https://github.com/webpack-contrib/css-loader) 来解析其中的 `url()` 引用，并将这些引用作为模块请求来处理。这意味着你可以根据本地的文件结构用相对路径来引用静态资源。另外要注意的是如果你想要引用一个 npm 依赖中的文件，或是想要用 webpack alias，则需要在路径前加上 `~` 的前缀来避免歧义。更多细节请参考[处理静态资源](./html-and-static-assets.md#处理静态资源)。