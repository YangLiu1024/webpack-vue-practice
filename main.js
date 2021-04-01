import Vue from 'vue'
//import App from './pages/app.vue'
import Daily from './pages/daily.vue'

import router from './router/index.js'
import store from './vuex'
import Bus from './vue-bus'

import './global.css'
Vue.use(Bus)

new Vue({
    el: "#app",
    //render: h => h(App),
    router,
    store,
    template: '<Daily/>',
    components: {
        Daily
    }
})