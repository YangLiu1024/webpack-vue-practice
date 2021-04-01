var path = require('path')
//var MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {VueLoaderPlugin} = require('vue-loader')

process.env.NODE_ENV = 'development'

var config = {
    mode: process.env.NODE_ENV,
    entry: {
        main: './main.js' //webpack 会从main.js 开始工作
    },
    output: {
        path: path.join(__dirname, './dist'), //指定打包后文件的存储目录路径
        publicPath: '/dist',//指定资源文件引用的目录，如果资源存在 CDN上，这里可以输入CDN的网址
        filename: 'main.js'//指定输出文件的名称，这里就意味着 webpack 打包后会输出到 ./dist/main.js, 然后只需要在 html 里引用这个文件就可以了
    },
    module: {
        rules: [//rules 可以指定一系列的loader， 每一个 loader 都必须包含一个 test 和 use 项
            //当 webpack 在编译过程中，require 或 import 符合某个 rule 的文件时，使用指定的加载器处理该文件
            {
                test: /\.css$/,//以 .css为后缀的文件
                // use: [ //use 可以是字符串或者数组，当是数组时，编译顺序是从后往前，对此例来说，就会先用 css-loader 处理，再用 style-loader 处理
                // 以这种形式处理 css file，最终会将 css 内容，以 <style> 标签的形式写进 HTML，导致HTML 体积臃肿
                //     'style-loader',
                //     'css-loader'
                // ]
                //使用插件之后的 use 
                //所有 css file 都会被提取到一个 main.css 文件
                use: [
                    // {
                    //     loader: MiniCssExtractPlugin.loader
                    // },
                    //如果是 production, 则会使用 MiniCssExtractPlugin.loader 将 css 提取到 main.css
                    //对于 vue 文件里的 <stype scoped>, 最后生成的 HTML 里，对应标签上会带有 data-v-*****, 且在 main.css 里可以找到 带有对应 data-v-**** 的 css 样式
                    //这是因为这个 style 是 组件独有的，会打上对应的 标签来区分
                    //如果去掉 scoped, 则设置的 css 样式全局可用，则最后生成的 HTML 里就不会有这样的标签
                    //process.env.NODE_ENV !== 'production' ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
                    'vue-style-loader',
                    'css-loader'
                ]
            }, 
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                // options: {
                //     loaders: {
                //         css: [
                //             MiniCssExtractPlugin.loader,
                //             'vue-style-loader',
                //             'css-loader'
                //         ]
                //     }
                // }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        //vue loader plugin 可以把你已经定义的其它 rule apply 到 vue 文件里，比如，如果你已经定义了 css和 js 的 loader
        //那么 VueLoaderPlugin 就可以把这些rule apply 到 vue 文件里的 script 和 style 部分
        new VueLoaderPlugin(),
        // new MiniCssExtractPlugin({
        //     filename: 'main.css'
        // })//将提取后的 css文件命名为 main.css
    ],
    // [Vue warn]: You are using the runtime-only build of Vue where the template option is not available. 
    // Either pre-compile the templates into render functions, or use the compiler-included build.
    // 换句话说，如果在非.vue 文件里使用 template，那么就会碰到上述错误
    // to fix this issue, either add below config, 
    // either make sure all components are defined in *.vue files, because they are pre-compilered，
    // 或者在 vue.config.js 里添加 module.exports = {runtimeCompiler: true}
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    }
}

module.exports = config //相当于 export default config, 只是还没有安装 ES6 语法编译插件