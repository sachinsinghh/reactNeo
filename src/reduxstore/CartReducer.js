const CartReducer = (state = {
    cart: [],
    totalItems: 0,
    success: false,
    removed: false
}, action) => {
    switch (action.type) {
        case "ADDTOCART" : {
            state = {...state}
            state.cart.push(action.payload?.data)
            state["totalItems"] += state.cart.length
            state["success"] = true
            state["removed"] = true
            return state
        }
        case "SHOW_CART" : {
            state = {...state}
            state["cart"] = action.payload?.data
            state["totalItems"] = action.payload?.data.length
            state["success"] = false
            state["removed"] = false
            return state
        }
        case "EMPTY_CART" : {
            state = {...state}
            state.cart = []
            state["removed"] = true
            return state
        }
        case "REMOVE_ONE_FROM_CART" : {
            state = {...state}
            state["removed"] = true
            return state
        }
        case "REMOVE_ITEM_FROM_CART" : {
            state = {...state}
            state["removed"] = true
            return state
        }
        case "PLACE_ORDER" : {
            state = {...state}
            state["success"] = true
            return state
        }
        default : return state
    }
}

export default CartReducer