var webpack = require('webpack')
var HtmlwebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
var {merge} = require('webpack-merge')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {VueLoaderPlugin} = require('vue-loader')
var baseConfig = require('./webpack.config.js')

baseConfig.plugins = [];

module.exports =
    merge(baseConfig, {
        output: {
            publicPath: '/dist/',
            filename: '[name].[hash].js'
        },
        optimization: {
            minimizer: [
                new UglifyJsPlugin()
            ]
        },
        plugins: [
            new VueLoaderPlugin(),
            new MiniCssExtractPlugin({
                filename: '[name].[hash].css'
            }),//将提取后的 css文件命名为 main.css
            new HtmlwebpackPlugin({
                filename: '../index_prod.html',
                template: './index.ejs',
                inject: false
            })
        ]
    })