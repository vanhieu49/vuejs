export default {
    actBuyProduct({ commit }, data) {
        //data -> product,quantity
        // console.log('store actBuyProduct', data)
    },
    actSetLoading({ commit }, loading = false) {
        commit('SET_LOADING', loading)
    }
}