export default {
    CHANGE_QUANTITY: (state, { index, quantity }, isReplace = false) => {
        if (isReplace) {
            state.listCarts[index].quantity = quantity;
        } else {
            state.listCarts[index].quantity += quantity;
        }

    },
    BUY_PRODUCT: (state, data) => {
        state.listCarts.push(data)
    },
    CHANGE_DELETE_CART: (state, newListCart) => {
        // console.log("deletecart mutation:", newListCart)
        state.listCarts = newListCart;
    }
}