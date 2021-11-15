import React , { useState , useEffect } from 'react'
import { useDispatch , useSelector } from 'react-redux';
import { loginAction } from '../actions/useractions';
import { useNavigate } from 'react-router-dom';

function Login() {

    const [ mailid , setMailid ] = useState('');
    const [ password , setPassword ] = useState('');

    let navigate = useNavigate();

    const redirect = '/register';

    const dispatch = useDispatch();

    const login = useSelector( state => state.login );
    const { loading , error , userInfo } = login;
    
    useEffect( () => {
        if(userInfo) {
            navigate("/");
        }
        document.title = "Login > SINGULARITY"
    } , [ userInfo , navigate , dispatch ] )

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch( loginAction ( mailid , password ) );
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <h6>Enter your Email</h6>
                <input 
                    placeholder="abc@abc.com" 
                    type="email" 
                    value={mailid} 
                    onChange={ (e) => setMailid(e.target.value) }
				/>
                <h6>Enter your Password</h6>
                <input 
                    placeholder="Pass$123" 
                    type="password" 
                    value={password} 
                    onChange={ (e) => setPassword(e.target.value) }/>
                <button type="submit">Login</button>
            </form>         
            <button onClick={ () => navigate(redirect) }>Register</button>   
        </div>
    )
}

export default Login
