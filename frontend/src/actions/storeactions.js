import axios from 'axios'
import {
    ADD_STORE_REQUEST,
    ADD_STORE_SUCCESS,
    ADD_STORE_FAILURE,
    GET_STORES_REQUEST,
    GET_STORES_SUCCESS,
    GET_STORES_FAILURE
} from '../constants/storeconstants'

export const addstoreAction = ( name ) => async(dispatch,getState) => {
    try {

        dispatch({
            type: ADD_STORE_REQUEST
        })

        const { login: userInfo } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.userInfo.token}`
            }
        }

        const { data } = await axios.post(
            '/api/stores/addstore',
            { name },
            config
        )

        dispatch({
            type: ADD_STORE_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: ADD_STORE_FAILURE,
            payload: error.message
        })

    }
}

export const getstoresAction = () => async(dispatch,getState) => {
    try {

        dispatch({
            type: GET_STORES_REQUEST
        })

        const { login: userInfo } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.userInfo.token}`
            }
        }

        const { data } = await axios.get(
            '/api/stores/getstores',
            config
        )

        dispatch({
            type: GET_STORES_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: GET_STORES_FAILURE,
            payload: error.message
        })

    }
}