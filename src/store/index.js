import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import moduleCart from './cart'
import moduleProduct from './product'

Vue.use(Vuex)

const localStorage = store => {
    // called when the store is initialized
    store.subscribe((mutation, state) => {
        // called after every mutation.
        // The mutation comes in the format of `{ type, payload }`.
        // console.log(state.cart.listCarts)
        window.localStorage.setItem('listCarts', JSON.stringify(state.cart))
    })
}

const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state,
    getters,
    actions,
    mutations,
    modules: {
        cart: moduleCart,
        product: moduleProduct
    },
    plugins: [localStorage]
})
export default store;