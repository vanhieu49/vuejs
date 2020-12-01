import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './plugins' // Tự động tìm đến file index.js
import Vuex from 'vuex'


Vue.use(Vuex)

//main.js -> index.js (plugins)
//index.js -> gọi toàn bộ plugin khác ở bên ngoài

new Vue({
    el: '#app',
    store,
    render: h => h(App)
})


// Mỗi thành phần trong Web tương ứng mỗi Component -> Tương ứng với 1 file *.vue