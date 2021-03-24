import Vue from 'vue'

//使用 vue 作为 event bus, 优点是 不用负责事件在组件树中的传递，使用简单，只需要 bus.$on 和 bus.$emit 以及 bus$.off 来监听，触发，解除 listener
//缺点是，事件是广播发出的，所有监听该事件的组件都会响应，并且无法区分事件源
export default new Vue({

})