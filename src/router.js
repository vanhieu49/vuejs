import Vue from 'vue'
import VueRouter from 'vue-router'

import HomePage from './pages/HomePage.vue'
import Register from './pages/Register.vue'
import ChangePassword from './pages/ChangePassword.vue'
import Login from './pages/Login.vue'
import PostDetail from './pages/PostDetail.vue'
import PostUpload from './pages/PostUpload.vue'
import UserPage from './pages/UserPage.vue'
import UserProfile from './pages/UserProfile.vue'
import Search from './pages/Search.vue'
import { ifNotAuthenticated, ifAuthenticated } from './plugins/authenticate'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home-page',
        component: HomePage
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        beforeEnter: ifNotAuthenticated
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        beforeEnter: ifNotAuthenticated
    },
    {
        path: '/user/:id',
        name: 'user-page',
        component: UserPage,
        beforeEnter: ifAuthenticated
    },
    {
        path: '/user/:id/profile',
        name: 'user-profile',
        component: UserProfile,
        beforeEnter: ifAuthenticated
    },
    {
        path: '/user/:id/password',
        name: 'change-password',
        component: ChangePassword
    },
    {
        path: '/post-detail/:id',
        name: 'post-detail',
        component: PostDetail
    },
    {
        path: '/upload',
        name: 'upload',
        component: PostUpload,
        beforeEnter: ifAuthenticated
    },
    {
        path: '/search',
        name: 'search',
        component: Search
    }
]
const router = new VueRouter({
    routes // short for `routes: routes`
})
export default router;