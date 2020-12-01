import Vue from 'vue'
import App from './App.vue'
import './plugins' // Tự động tìm đến file index.js

//main.js -> index.js (plugins)
//index.js -> gọi toàn bộ plugin khác ở bên ngoài

new Vue({
    el: '#app',
    render: h => h(App)
})


// Mỗi thành phần trong Web tương ứng mỗi Component -> Tương ứng với 1 file *.vue