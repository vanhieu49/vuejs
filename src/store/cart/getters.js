export default {
    ffootInfo: state => {
        let { listCarts } = state;
        let initObjectSum = { countItem: 0, totalPrice: 0 };
        return listCarts.reduce((objSum, objCart) => {
            let countItem = objSum.countItem + objCart.quantity;
            let totalPrice = objSum.totalPrice + objCart.quantity * objCart.product.price;
            return { countItem, totalPrice }
        }, initObjectSum)

    }
}