import axios from 'axios'
import {
    ADD_ITEM_REQUEST,
    ADD_ITEM_SUCCESS,
    ADD_ITEM_FAILURE,
    GET_ITEMS_REQUEST,
    GET_ITEMS_SUCCESS,
    GET_ITEMS_FAILURE,
    UPDATE_ITEM_REQUEST,
    UPDATE_ITEM_SUCCESS,
    UPDATE_ITEM_FAILURE,
    SEARCH_ITEM_REQUEST,
    SEARCH_ITEM_SUCCESS,
    SEARCH_ITEM_FAILURE
} from '../constants/itemconstants'

export const additemAction = ( storeID , name , stock , reserve , priceperunit ) => async(dispatch,getState) => {
    try {

        dispatch({
            type: ADD_ITEM_REQUEST
        })

        const { login: userInfo } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/items/additem/${storeID}`,
            { name , stock , reserve , priceperunit },
            config
        )

        dispatch({
            type: ADD_ITEM_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: ADD_ITEM_FAILURE,
            payload: error.message
        })

    }
}

export const getitemsAction = ( storeID ) => async(dispatch,getState) => {
    try {

        dispatch({
            type: GET_ITEMS_REQUEST
        })

        const { login: userInfo } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/items/getitems/${storeID}`,
            config
        )

        dispatch({
            type: GET_ITEMS_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: GET_ITEMS_FAILURE,
            payload: error.message
        })

    }
}

export const updateitemAction = ( id , itemID , stock , reserve ) => async( dispatch , getState ) => {

    try {
        
        dispatch({
            type: UPDATE_ITEM_REQUEST
        })

        const { login: { userInfo } } = getState();

        const config = {
            headers: {
                "Content-Type" : "application/json",
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/items/updateitem/${id}`,
            { itemID , stock , reserve },
            config
        )

        dispatch({
            type: UPDATE_ITEM_SUCCESS,
            payload: data
        })

    } catch (error) {
        
        dispatch({
            type: UPDATE_ITEM_FAILURE,
            payload: error.message
        })

    }

}

export const searchitemAction = ( id , min , max , text ) => async( dispatch , getState ) => {

    try {
        
        dispatch({
            type: SEARCH_ITEM_REQUEST
        })

        const { login: { userInfo } } = getState();

        const config = {
            headers: {
                "Content-Type" : "application/json",
                Authorization : `Bearer ${userInfo.token}`
            }
        }
        const reqbody = { min , max , text }

        const { data } = await axios.get(
            `/api/items/searchitem/${id}`,
            reqbody,
            config
        )
console.log(data);
        dispatch({
            type: SEARCH_ITEM_SUCCESS,
            payload: data
        })

    } catch (error) {
        
        dispatch({
            type: SEARCH_ITEM_FAILURE,
            payload: error.message
        })

    }

}