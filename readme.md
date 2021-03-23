# Introduction to webpack

Web 应用包含大量的 .js, .css, .jpg 等资源，Webpack 将每个资源都视为一个模块，分析处理它们之间的依赖关系，并将它们进行打包。

## 安装依赖
- npm install webpack --save-dev
- npm install webpack-dev-server --save-dev. webpack server 通过建立一个 websocket 支持热更新
- 新建 webpack.config.js 文件，并在 package.json 设置 webpack server 快速启动配置。
    * 当执行 npm run dev 时，就会执行对应的命令
    * --open 会在执行命令时，自动在浏览器打开页面，默认地址是 127.0.0.1:8080,不过 ip 和 端口都是可以配置的，比如 --host 172.172.172.1 --port 8888 --open

## Webpack 配置
Webpack 配置最重要也是必需的两项是入口(Entry)和出口(Output)，入口是告诉 webpack 去哪儿开始寻找依赖，并且编译，出口则是用来配置编译后的文件存储位置和文件名

## Webpack 加载器
在 webpack 里，每一个资源都是一个模块，每种模块都有自己的加载器。 通过安装不同的加载器可以对不同后缀的文件进行处理。比如，如果要写 css 样式, 就需要 style-loader 和 css-loader

## Webpack 插件
有的时候，只有加载器，编译之后的代码会显得臃肿，这个时候就会用到插件。
比如对于 css 文件，当项目较大时，把 css编译进 js文件太占体积，还不能做缓存。
这个时候就可以使用 mini-css-extract-plugin 来把散落在各地的css 提取出来，并生成一个main.css 文件来存储，最终在 index.html 通过 link 来引用

## Webpack 与 Vue 单文件
Vue 单文件是指以 .vue 为后缀的文件，它一般以三个部分构成: <template> <script> <style>.
template 用来书写组件模板，script用来配置 组件 vue 实例，style 用来书写 css
### vue
为了support vue，需要安装 vue。
<code>npm install vue --save</code>
为了能够加载 .vue 文件，需要配置 .vue 加载器
<code>npm install vue-loader -D</code>
<code>npm install vue-style-loader -D</code>
<code>npm install vue-template-compiler -D</code>
<code>npm install vue-hot-reload-api -D</code>

### ES6
为了使用 ES6 语法，需要安装 babel.
<code>npm install babel -D</code>
<code>npm install babel-loader -D</code>
<code>npm install babel-core -D</code>
<code>npm install babel-plugin-transform-runtime -D</code>
<code>npm install babel-preset-es2015 -D</code>
<code>npm install babel-runtime -D</code>
创建 <pre>.babelrc</pre> 配置文件配置 babel, webpack 会依赖此文件来使用 babel 编译 ES6 code。
注意 <pre>babel-loader@8 requires Babel 7.x (the package '@babel/core'). If you'd like to use Babel 6.x ('babel-core'), you should install 'babel-loader@7'</pre>

### 修改 config 文件
安装所有依赖后，需要修改 config 文件来配置 vue 文件加载器和 ES6 处理器

配置好这些设置后，就可以使用 vue 文件了

### 图片加载器
安装 url-loader 和 file-loader 来支持图片，字体都文件的加载
<code>npm install url-loader file-loader -D</code>

## webpack package
打包会用到 webpack-merge 和 html-webpack-plugin 两个依赖
<code>npm install webpack-merge html-webpack-plugin -D</code>
webpack-merge 就是用来 merge 不同的 webpack 配置文件。 html-webpack-plugin 是用来生成 html 文件的

## 前端路由
基于前后端分离的开发模式，后端专注于数据，前端负责 HTML 和用户交互。前端通过 axios 从后端获取数据，然后以一定的方式渲染到页面里。
单页面应用(SPA), 就是在此基础上，再加上前端路由。
前端路由，即由前端来维护一个路由规则。单页面即指只有一个 html文件，整个网站的所有内容都在这个 html 文件里，通过 JavaScript 来处理

### Vue-router
vue 可以通过特殊的 component tag 和 is 属性来动态的切换组件，vue-router 的实现与之类似，不同路由的不同页面事实上就是加载不同的组件。
<code>npm install vue-router --save</code>

