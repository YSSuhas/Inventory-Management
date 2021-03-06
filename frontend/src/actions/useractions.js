import axios from 'axios'
import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from '../constants/userconstants'

export const registerAction = ( mailid , password , username ) => async(dispatch) => {
    try {

        dispatch({
            type: REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(
            '/api/users/register',
            { mailid , password , username },
            config
        )

        dispatch({
            type: REGISTER_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo',JSON.stringify(data));

    } catch (error) {

        dispatch({
            type: REGISTER_FAILURE,
            payload: error.message
        })

    }
}

export const loginAction = ( mailid , password ) => async(dispatch) => {
    
    try {

        dispatch({
            type: LOGIN_REQUEST
        })
        
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const { data } = await axios.post(
            '/api/users/login',
            { mailid , password },
            config
        )

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo' , JSON.stringify(data));

    } catch (error) {
        
        dispatch({
            type: LOGIN_FAILURE,
            payload: error.message
        })

    }

}