import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/style.css'
import { Datetime } from 'vue-datetime';
import 'vue-datetime/dist/vue-datetime.css'
import "@babel/polyfill";
import { auth } from './config/firebase'

Vue.component('datetime', Datetime);
auth.onAuthStateChanged((user) => {
    if (user) {
        let data = {
            email: user.email,
            uid: user.uid
        }
        store.commit('SET_CURRENT_USER', data)
        router.push('/')
    } else {
        let data = {
            email: '',
            uid: ''
        }
        store.commit('SET_CURRENT_USER', data)
        router.push('/login')
    }
});

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})