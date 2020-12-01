import store from '../store'

const ifNotAuthenticated = (to, from, next) => {
    //Router chỉ cho phép vào khi chưa đăng nhập(Login,register)
    if (store.getters.isLogin === false) {
        next()
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
    //2. router chỉ cho phép vào khi đã đăng nhập.0
    if (store.getters.isLogin === true) {
        next();
    } else {
        next({
            name: 'login',
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