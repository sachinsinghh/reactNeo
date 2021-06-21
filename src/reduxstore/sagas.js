import {call, takeEvery, put, all} from "redux-saga/effects"
import axios from "axios";

const addCake = (action) => {
    return axios({
        url: process.env.REACT_APP_API_BASE_URL + '/addcake',
        method: "post",
        data: action.payload || {}
    })
}

export function *AddCakeGenerator(action, props) {
    let result = yield(call(addCake, action))
    if (result.data) {
        window.location.reload()
        yield put({
            type: "ADD_CAKE_SUCCESS",
            payload: result.data
        })
    } else {
        yield put({
            type: "ADD_CAKE_FAILURE"
        })
    }
}

function *AddCakeSaga() {
    yield takeEvery('ADD_CAKE', AddCakeGenerator)
}
export default function *MainSaga() {
    yield all([AddCakeSaga()])
}