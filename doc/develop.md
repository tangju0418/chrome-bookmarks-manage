# 参考文档

## JavaScript
[ES2005文档](https://babeljs.io/docs/learn-es2015/)
[JavaScript 标准参考教程（alpha）](http://javascript.ruanyifeng.com/)
[ECMAScript 6入门](http://es6.ruanyifeng.com/)
[es6features](https://github.com/lukehoban/es6features)
[JavaScript Promise迷你书（中文版）](http://liubin.org/promises-book/)
[Polyfill](http://babeljs.io/docs/usage/polyfill/)
[core-js](https://github.com/zloirock/core-js)
[UglifyJS](https://github.com/mishoo/UglifyJS2#compressor-options)

## vue
[vue文档](http://cn.vuejs.org/)
[vue-router文档](http://vuejs.github.io/vue-router/zh-cn/index.html)
[vue-resource文档](http://npm.taobao.org/package/vue-resource)
[vue-validator文档](https://github.com/vuejs/vue-validator)
[vuex文档](http://vuex.vuejs.org/zh-cn/index.html)

## ui
[sui文档](http://m.sui.taobao.org/components/)
[stylus文档](http://www.zhangxinxu.com/jq/stylus/)
[Icons](http://fortawesome.github.io/Font-Awesome/icons/)
[CSS](http://www.w3school.com.cn/css/index.asp)

## mui
[mui](http://dev.dcloud.net.cn/mui/)
[html5plus](http://www.html5plus.org/doc/zh_cn/android.html)

## build
[webpack文档](http://fakefish.github.io/react-webpack-cookbook/index.html)
[webpack-dev-server文档](https://github.com/webpack/docs/wiki/webpack-dev-server)
[html-loader文档](https://github.com/webpack/html-loader)

# 开发前设置

1. vue组件，页面绑定属性后，不支持热替换的处理：
修改 `vue-hot-reload-api/index.js` ：
```javascript
exports.update = function (id, newOptions, newTemplate) {
  ＋  window.location.reload()
```

# 代码约定

1. 不要使用代码自动格式化工具；


# JAVASCRIPT分号规则

括号，方括号，正则开头的斜杠，加号，减号，作为行首的情况，添加分号，其他时候全部不需要。

> **建议**

> 如果 return, throw, break, continue 这些语句有参数，不要将参数放在独立的行。

> 保持一致（与 return）, 如果一个花括号或者方括号是表达式的一部分，不要将他们放在独立的一行。
```javascript
var obj = { // 不要将花括号放到新行
name: "John"
}; var arr = [ // 不要将方括号放到新行
5, 13, 29
];
```


# 命名
./node_modules/.bin/uglifyjs ./app_common/sweetalert/sweetalert-dev.js -o ./app_common/sweetalert/sweetalert.min.js -m

# 生成升级包命令

## 内测版

### mac
./node_modules/.bin/cross-env NODE_ENV=development node pack.js --pre && ./node_modules/.bin/cross-env NODE_ENV=development ./node_modules/.bin/webpack --progress --hide-modules --config webpack.pack.js && ./node_modules/.bin/cross-env NODE_ENV=development node pack.js --pack --android --ios --update=./unpackage --zip

### window
#### 本地环境

node_modules\.bin\cross-env.cmd NODE_ENV=development node pack.js --pre ; node_modules\.bin\cross-env.cmd NODE_ENV=development node_modules\.bin\webpack.cmd --progress --hide-modules --config webpack.pack.js; node_modules\.bin\cross-env.cmd NODE_ENV=development node pack.js --pack --android --ios --update=unpackage

#### 服务器环境
node_modules\.bin\cross-env.cmd NODE_ENV=development node pack.js --pre ; node_modules\.bin\cross-env.cmd NODE_ENV=development node_modules\.bin\webpack.cmd --progress --hide-modules --config webpack.pack.js; node_modules\.bin\cross-env.cmd NODE_ENV=development node pack.js --pack --android --ios --update=D:/apps/Things.Apps/update

## 公测版

### mac
./node_modules/.bin/cross-env NODE_ENV=production node pack.js --pre && ./node_modules/.bin/cross-env NODE_ENV=production ./node_modules/.bin/webpack --progress --hide-modules --config webpack.pack.js -p && ./node_modules/.bin/cross-env NODE_ENV=production node pack.js --pack --android --ios --update=./unpackage --zip

### window
#### 本地环境
node_modules\.bin\cross-env.cmd NODE_ENV=production node pack.js --pre ; node_modules\.bin\cross-env.cmd NODE_ENV=production node_modules\.bin\webpack.cmd --progress --hide-modules --config webpack.pack.js -p ; node_modules\.bin\cross-env.cmd NODE_ENV=production node pack.js --pack --android --ios --update=unpackage

#### 服务器环境
node_modules\.bin\cross-env.cmd NODE_ENV=production node pack.js --pre ; node_modules\.bin\cross-env.cmd NODE_ENV=production node_modules\.bin\webpack.cmd --progress --hide-modules --config webpack.pack.js -p ; node_modules\.bin\cross-env.cmd NODE_ENV=production node pack.js --pack --android --ios --update=D:/apps/Things.Apps/update

#### 服务器环境(2012 R2)
node_modules\.bin\cross-env.cmd NODE_ENV=production node pack.js --pre && node_modules\.bin\cross-env.cmd NODE_ENV=production node_modules\.bin\webpack.cmd --progress --hide-modules --config webpack.pack.js -p && node_modules\.bin\cross-env.cmd NODE_ENV=production node pack.js --pack --android --ios --update=D:/apps/Things.Apps/update
