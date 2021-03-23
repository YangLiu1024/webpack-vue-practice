import Help from '../pages/help.vue'
import User from '../pages/user.vue'

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
//所谓的 vue-router 就是，当 url 满足某个定义的路径时，将该路径对应的 component 挂载到对应的 router-view 里面去
//整个页面并没有更换，还是在当前页面，只是其中的某个部分被修改了
const routes = [
    {
        path: '/help',
        component: Help
    },
    {
        path: '/about',
        //当使用懒加载模式，webpack 在打包时就会给该页面生成一个对应的 js文件，当访问该页面时，运行该js 文件
        //这里假设 about 页面很复杂，需要加载 2s 才能完成， 当在网站上第一次进入 about 路由时，会等待 2s,然后才会渲染 about 页面
        //在下一次进入 about 页面时，则不会
        component: r => setTimeout(() => require(['../pages/about.vue'], r), 2000)
    },
    {
        path: '/user/:id',
        component: User
    },
    {
        path: '',
        component: Help
    }
]
var router = new VueRouter({
    routes
})

//可以给 router 设置 beforeEach 钩子函数，会在每次路由改变之前触发
//to 是将要跳转去的 route 对象，from 是当前 route 对象， next 是 resolve 函数，必须调用该方法，才能进入下一个钩子
router.beforeEach((to, from, next) => {
    console.log('before each route change', to.fullPath, from.fullPath)
    if (window.localStorage.getItem('token')) {
        console.log('route succeed')
        next()
    } else {
        //当没有登录，跳转到登录页面
        next()
        //next(false) 表示取消当前导航
    }
}) 

router.afterEach((to, from) => {
    console.log('after each route change')
    window.scrollTo(0, 0)
})
export default router