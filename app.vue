<template>
    <div>Hello {{name}}
        <Button :color="color" @on-click="changeColor">Change Color</Button>
        <p><img src="images/water.jpg" style="width:400px"/></p>
    </div>
</template>

<script>
import Button from './button.vue'

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
        Button
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