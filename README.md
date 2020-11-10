<h1 align="center">waker's platform framework of vue-cli4</h1>


环境和依赖
----

- node
- yarn
- webpack
- eslint
- @vue/cli ~4
- [ant-design-vue](https://github.com/vueComponent/ant-design-vue) - Ant Design Of Vue 实现


> 请注意，我们强烈建议本项目使用 [Yarn](https://yarnpkg.com/) 包管理工具，这样可以与本项目演示站所加载完全相同的依赖版本 (yarn.lock) 。由于我们没有对依赖进行强制的版本控制，采用非 yarn 包管理进行引入时，可能由于 Pro 所依赖的库已经升级版本而引入了新版本所导致的问题。作者可能会由于时间问题无法及时排查而导致您采用本项目作为基项目而出现问题。



项目下载和运行
----

- 拉取项目代码
```bash
git clone https://github.com/sendya/ant-design-pro-vue.git
cd ant-design-pro-vue
```

- 安装依赖
```
yarn install
```

- 开发模式运行
```
yarn run serve
```

- 编译项目
```
yarn run build
```

- Lints and fixes files
```
yarn run lint
```



其他说明
----

- **关于 Issue 反馈 (重要!重要!重要!) 请在开 *Issue* 前，先阅读该内容：[Issue / PR 编写建议](https://github.com/sendya/ant-design-pro-vue/issues/90)** 

- 项目使用的 [vue-cli3](https://cli.vuejs.org/guide/), 请确保你所使用的 vue-cli 是新版，并且已经学习 cli 官方文档使用教程

- 关闭 Eslint (不推荐) 移除 `package.json` 中 `eslintConfig` 整个节点代码, `vue.config.js` 下的 `lintOnSave` 值改为 `false`

- 组件按需加载 `/src/main.js` L14 相关代码 `import './core/lazy_use'` / `import './core/use'` 

- [修改 Ant Design 配色 (@kokoroli)](https://github.com/kokoroli/antd-awesome/blob/master/docs/Ant_Design_%E6%A0%B7%E5%BC%8F%E8%A6%86%E7%9B%96.md)

- I18n: [多语言支持 (@musnow)](./src/locales/index.js)

- 生成环境默认不加载 `mock`，更多详情请看 `src/mock/index.js`

- **用于生产环境，请使用 `release` 版本代码，使用 master 代码出现的任何问题需要你自行解决**

## 浏览器兼容

Modern browsers and IE10.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --- | --- | --- | --- | --- |
| IE10, Edge | last 2 versions | last 2 versions | last 2 versions | last 2 versions |


## Contributors

This project exists thanks to all the people who contribute. 
<a href="https://github.com/sendya/ant-design-pro-vue/graphs/contributors"><img src="https://opencollective.com/ant-design-pro-vue/contributors.svg?width=890&button=false" /></a>


## Backers

Thank you to all our backers! 🙏 [[Become a backer](https://opencollective.com/ant-design-pro-vue#backer)]

<a href="https://opencollective.com/ant-design-pro-vue#backers" target="_blank"><img src="https://opencollective.com/ant-design-pro-vue/backers.svg?width=890"></a>


## Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a link to your website. [[Become a sponsor](https://opencollective.com/ant-design-pro-vue#sponsor)]

<a href="https://opencollective.com/ant-design-pro-vue/sponsor/0/website" target="_blank"><img src="https://opencollective.com/ant-design-pro-vue/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/ant-design-pro-vue/sponsor/1/website" target="_blank"><img src="https://opencollective.com/ant-design-pro-vue/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/ant-design-pro-vue/sponsor/2/website" target="_blank"><img src="https://opencollective.com/ant-design-pro-vue/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/ant-design-pro-vue/sponsor/3/website" target="_blank"><img src="https://opencollective.com/ant-design-pro-vue/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/ant-design-pro-vue/sponsor/4/website" target="_blank"><img src="https://opencollective.com/ant-design-pro-vue/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/ant-design-pro-vue/sponsor/5/website" target="_blank"><img src="https://opencollective.com/ant-design-pro-vue/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/ant-design-pro-vue/sponsor/6/website" target="_blank"><img src="https://opencollective.com/ant-design-pro-vue/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/ant-design-pro-vue/sponsor/7/website" target="_blank"><img src="https://opencollective.com/ant-design-pro-vue/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/ant-design-pro-vue/sponsor/8/website" target="_blank"><img src="https://opencollective.com/ant-design-pro-vue/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/ant-design-pro-vue/sponsor/9/website" target="_blank"><img src="https://opencollective.com/ant-design-pro-vue/sponsor/9/avatar.svg"></a>
