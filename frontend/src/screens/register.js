import React , { useState , useEffect } from 'react'
import { useDispatch , useSelector } from 'react-redux';
import { registerAction } from '../actions/useractions';
import { useNavigate } from 'react-router-dom';

function Register({ history }) {

    const [ mailid , setMailid ] = useState('');
    const [ password , setPassword ] = useState('');
    const [ username , setUsername ] = useState('');
    const [ confirmpassword , setConfirmpassword ] = useState('');

    const redirect = '/login';

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const register = useSelector(state => state.register);

    const { loading , error , userInfo } = register;

    useEffect(() => {
        if(userInfo) {
            navigate('/');
        }
        document.title = "Register > SINGULARITY";
    }, [ history , userInfo , dispatch ])

    const handleSubmit = (e) => {
        e.preventDefault();
        if( password !== confirmpassword ) {
            alert("Passwords do not match");
        }
        else {
            dispatch( registerAction ( mailid , password , username ) );
        }
    }


    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <h6>Enter a Email ID</h6>
                <input 
                    placeholder="abc@abc.com" 
                    type="email" 
                    value={mailid} 
                    onChange={ (e) => setMailid(e.target.value) }
				/>
                <h6>Enter a Password</h6>
                <input 
                    placeholder="Pass$123" 
                    type="password" 
                    value={password} 
                    onChange={ (e) => setPassword(e.target.value) }
                />
                <h6>Enter a Name</h6>
                <input 
                    placeholder="ABC"  
                    value={username} 
                    onChange={ (e) => setUsername(e.target.value) }
				/>
                <h6>Confirm Password</h6>
                <input 
                    placeholder="Pass$123" 
                    type="password" 
                    value={confirmpassword} 
                    onChange={ (e) => setConfirmpassword(e.target.value) }
                />
                <button type="submit">Register</button>
            </form>
            <button onClick={ () => navigate(redirect) }>Login</button>  
        </div>
    )
}

export default Register
