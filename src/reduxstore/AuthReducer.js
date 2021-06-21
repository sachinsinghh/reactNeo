const AuthReducer = (state = {
    isLoggedIn: !!localStorage.token,
    username: localStorage.getItem('userData') ? (JSON.parse(localStorage.getItem('userData'))).name : undefined,
    token: localStorage.token,
    isLoading: false
}, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS" : {
            state = {...state}
            state['token'] = action.payload?.token
            state['isLoggedIn'] = true
            state['username'] = action.payload?.username
            state['isLoading'] = true
            return state
        }
        case "LOGIN_FAIL" : {
            state = {...state}
            state['isLoading'] = false
            return state
        }
        case "LOGOUT" : {
            state = {...state}
            state['token'] = localStorage.clear()
            state['isLoggedIn'] = false
            state['username'] = undefined
            return state
        }
        default : return state
    }
}

export default AuthReducer