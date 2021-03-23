import Vue from 'vue'
import App from './pages/app.vue'

import router from './router/index.js'

new Vue({
    el: "#app",
    render: h => h(App),
    router
    // template: '<App/>',
    // components: {
    //     App
    // }
})