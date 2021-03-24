//plugin 必须导出 install 方法， Vue 在 use 该 plugin 时，就会调用其 install 方法
//这里把 event bus 作为 插件使用，可以避免在每个使用的地方导入 event bus module
const install = function(Vue) {
    const Bus = new Vue({
        methods: {
            //...args 是 ES6 的解构语法， 这儿的 ...args 可以获取第二个到最后的参数(因为第一个参数已经被提取)
            emit(event, ...args) {
                this.$emit(event, ...args)
            },
            on(event, callback) {
                this.$on(event, callback)
            },
            off(event, callback) {
                this.$off(event, callback)
            }
        }
    })

    Vue.prototype.bus = Bus;
}

export default install;