import store from '../store';

const ifNotAuthenticated = (to, from, next) => {
    // 1. Router chỉ cho phép vào khi chưa đăng nhập (Login, Register)
    if (store.getters.isLogin === false) {
        next(); // Cho phép vào
    } else {
        next({
            name: 'home-page',
            query: {
                redirect: to.name
            }
        })
    }

}

const ifAuthenticated = (to, from, next) => {
    // 2. Router chỉ chó phép vào khi đã đăng nhập
    if (store.getters.isLogin === true) {
        next(); // Cho phép vào
    } else {
        next({
            name: 'login-page',
            query: {
                redirect: to.name
            }
        })
    }
}

export {
    ifNotAuthenticated,
    ifAuthenticated
}