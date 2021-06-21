import axios from "axios";

export const loginMiddleware = (data) => {
    return function (dispatch) {
        axios({
            url: process.env.REACT_APP_API_BASE_URL +'/login',
            method: 'post',
            data: {email: data.email, password: data.password}
        }).then(res => {
            if (res.data.email) {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('userData', JSON.stringify(res.data))
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: {
                        token: res.data.token,
                        username: res.data.name
                    }
                })
            }
        }, err => {
            dispatch({
                type: "LOGIN_FAIL"
            })
        })
    }
}

export const addCartMiddleware = (data) => {
    return function (dispatch) {
        axios({
            url: process.env.REACT_APP_API_BASE_URL +'/addcaketocart',
            method: 'post',
            data: {cakeid: data.cakeid, image: data.image, name: data.name, price: data.price, weight: data.weight}
        }).then(res => {
            dispatch({
                type: "ADDTOCART",
                payload: {
                    data: res.data.data
                }
            })
        }, err => {})
    }
}

export const emptyCartMiddleware = () => {
    return function (dispatch) {
        axios({
            url: process.env.REACT_APP_API_BASE_URL + '/clearcart',
            method: 'post'
        }).then(res => {
            console.log('empty res', res)
            dispatch({
                type: 'EMPTY_CART',
                payload : {
                    data: res.data
                }
            })
        }, err => {})
    }
}

export const removeOneCakeFromCartMiddleware = (cakeId) => {
    return function (dispatch) {
        axios({
            url: process.env.REACT_APP_API_BASE_URL + '/removeonecakefromcart',
            method: 'post',
            data: {cakeid: cakeId}
        }).then(res => {
            dispatch({
                type: 'REMOVE_ONE_FROM_CART',
                payload: {
                    data: res.data
                }
            })
        }, err => {})
    }
}

export const removeCakeFromCartMiddleware = (cakeId) => {
    return function (dispatch) {
        axios({
            url: process.env.REACT_APP_API_BASE_URL + '/removecakefromcart',
            method: 'post',
            data: {cakeid: cakeId}
        }).then(res => {
            dispatch({
                type: 'REMOVE_ITEM_FROM_CART',
                payload: {
                    data: res.data
                }
            })
        }, err => {})
    }
}

export const placeOrderMiddleware = (data) => {
    return function (dispatch) {
        axios({
            url: process.env.REACT_APP_API_BASE_URL + '/addcakeorder',
            method: 'post',
            data: data
        }).then(res => {
            console.log('order p[lace res', res)
            dispatch({
                type: 'PLACE_ORDER',
                payload: {
                    data: res.data
                }
            })
        }, err => {})
    }
}