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

export const additemReducer = ( state = {} , action ) => {
    
    switch(action.type) {

        case ADD_ITEM_REQUEST: 
            return {
                loading: true
            }
        
        case ADD_ITEM_SUCCESS:
            return {
                loading: false,
                itemInfo: action.payload
            }

        case ADD_ITEM_FAILURE:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    
    }
}

export const getitemsReducer = ( state = {} , action ) => {
    
    switch(action.type) {

        case GET_ITEMS_REQUEST: 
            return {
                loading: true
            }
        
        case GET_ITEMS_SUCCESS:
            return {
                loading: false,
                getItems: action.payload
            }

        case GET_ITEMS_FAILURE:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    
    }
}

export const updateitemReducer = ( state={} , action ) => {

    switch(action.type) {

        case UPDATE_ITEM_REQUEST:
            return {
                loading: true
            }
        
        case UPDATE_ITEM_SUCCESS:
            return {
                loading: false,
                updateItem: action.payload
            }

        case UPDATE_ITEM_FAILURE:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state

    }

}

export const searchitemReducer = ( state = {} , action ) => {
    
    switch(action.type) {

        case SEARCH_ITEM_REQUEST: 
            return {
                loading: true
            }
        
        case SEARCH_ITEM_SUCCESS:
            return {
                loading: false,
                searchItem: action.payload
            }

        case SEARCH_ITEM_FAILURE:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    
    }
}