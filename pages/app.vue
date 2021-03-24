<template>
    <div>Hello {{name}}
        <Button :color="color" @on-click="changeColor">Change Color</Button>
        <!-- router-link 默认渲染为 <a>, 可以通过 tag 属性更改为其它标签。 to属性就是将要跳转的 url-->
        <router-link to="/about">About</router-link>
        <router-link to="/help">Help</router-link>
        <p><img src="images/water.jpg" style="width:400px"/></p>
        <!-- router view 就相当于是一个受路由信息控制的 slot, 当路由配置 match, 则对应的组件就会填充到 router view 里，只要 router view 在整个组件树中存在
        也就是说，不管在哪个组件里添加 router-view, 都会填充进去-->
        <router-view/>
        <div><Help/></div>
    </div>
</template>

<script>
import Button from '../components/button.vue'
import Help from './help.vue'

//VInput 不是在 .vue 里定义的组件，
//如果不在 vue.config.js 里设置 runtimeCompiler:true 或者不在 webpack.config.js 里设置 vue 的 alias vue/dist/vue.js, 则不会被 compile
// var VInput = {
//     template: '<div><input/></div>'
// }
export default {
    data() {
        return {
            name: 'Vue.js',
            color: '#aabb00'
        }
    },
    components: {
        Button,
        Help
    },
    methods: {
        changeColor() {
            this.color = '#000'
        }
    }
}
</script>

<style scoped>
    div {
        color:cadetblue;
        font-size: 24px
    }
</style>