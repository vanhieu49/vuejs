import './plugins'
import './assets/style.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@babel/polyfill";

// import './demoAsyn'

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})