export default {
    actBuyProduct({ commit, state }, data) {
        //data -> product,quantity
        // console.log('cart actBuyProduct', data)a
        let index = state.listCarts.findIndex(cart => {
            return cart.product.id === data.product.id
        })
        if (index === -1) {
            commit("BUY_PRODUCT", data)
        } else {
            let quantity = data.quantity;
            commit("CHANGE_QUANTITY", { index, quantity })
        }
    },
    actDeleteCart({ commit, state }, cart) {
        // console.log("id product cart delete:", cart.product.id)
        let newListCart = state.listCarts.filter(item => {
            return item.product.id !== cart.product.id
        })
        commit('CHANGE_DELETE_CART', newListCart)
    },
    actUpdateQuantity({ commit, state }, { cartUpdate, quantity }) {
        let index = state.listCarts.findIndex(cart => {
            return cart.product.id === cartUpdate.product.id
        })
        if (index !== -1) {
            let data = {
                index,
                quantity,
                isReplace: true
            }
            commit('CHANGE_QUANTITY', data)
        }
    }
}