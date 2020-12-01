import VueRouter from 'vue-router'
import Vue from 'vue'

import HomePage from './pages/HomePage.vue'
import AboutUs from './pages/AboutUs.vue'
import Contact from './pages/Contact.vue'
import BlogDetail from './pages/BlogDetail.vue'
import Login from './pages/Login.vue'
import NotFound from './pages/PageNotFound.vue'
import store from './store'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home-page',
        component: HomePage
    },
    {
        path: '/about-us',
        name: "about-us",
        component: AboutUs
    },
    {
        path: "/contact",
        name: "contact",
        component: Contact
    },
    {
        path: "/blog-detail/:title.:id",
        name: "blog-detail",
        component: BlogDetail,
        beforeEnter: (to, from, next) => {
            // ...
            if (store.state.isLogin) {
                next()
            } else {
                next({ path: '/login', query: { redirect: 'blog-detail' } })
            }

        }
    },
    {
        path: "/login",
        name: "login",
        component: Login
    },
    {
        path: '*',
        name: "not-found",
        component: NotFound
    }
]

const router = new VueRouter({
    routes // short for `routes: routes`
})

export default router;