import Vue from 'vue'
import App from './pages/app.vue'

import router from './router/index.js'
import store from './vuex'

new Vue({
    el: "#app",
    render: h => h(App),
    router,
    store
    // template: '<App/>',
    // components: {
    //     App
    // }
})