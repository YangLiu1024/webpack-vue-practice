import Vue from 'vue'
import App from './pages/app.vue'

import router from './router/index.js'
import store from './vuex'
import Bus from './vue-bus'

Vue.use(Bus)

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