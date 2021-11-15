import {
    ADD_STORE_REQUEST,
    ADD_STORE_SUCCESS,
    ADD_STORE_FAILURE,
    GET_STORES_REQUEST,
    GET_STORES_SUCCESS,
    GET_STORES_FAILURE
} from '../constants/storeconstants'

export const addstoreReducer = ( state = {} , action ) => {
    
    switch(action.type) {

        case ADD_STORE_REQUEST: 
            return {
                loading: true
            }
        
        case ADD_STORE_SUCCESS:
            return {
                loading: false,
                storeInfo: action.payload
            }

        case ADD_STORE_FAILURE:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    
    }
}

export const getstoresReducer = ( state = {} , action ) => {
    
    switch(action.type) {

        case GET_STORES_REQUEST: 
            return {
                loading: true
            }
        
        case GET_STORES_SUCCESS:
            return {
                loading: false,
                getStores: action.payload
            }

        case GET_STORES_FAILURE:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    
    }
}