import React , { useState , useEffect } from 'react'
import { useDispatch , useSelector } from 'react-redux';
import { getstoresAction , addstoreAction } from '../actions/storeactions';
import Viewcard from '../components/viewcard';
import { Row , Col } from 'reactstrap';
import './home.css';
import { useNavigate } from 'react-router-dom';

function Home() {

    const [ name , setName ] = useState('');

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const getstores = useSelector( state => state.getstores );
    const { loading , error , getStores } = getstores;

    useEffect( () => {
        if(!userInfo) {
            navigate('/login');
        }
        dispatch(getstoresAction());
        document.title = "Stores > KART";
    } , [ dispatch ])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addstoreAction(name));
    }

    const logoutHandler = () => {
        localStorage.removeItem('userInfo')
        navigate('/login');
    }

    return (
        <div>
            <h1>Home page</h1>  
            <form onSubmit={logoutHandler}>
                <button type="submit">Logout</button>
            </form>
            <h1>Hi {userInfo.username}, your stores</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={name} 
                    placeholder="Store name" 
                    onChange={(e) => {setName(e.target.value)}} 
                />
                <button type="submit">Add Store</button>
            </form>   
            <Row className="Row">
            { getStores && getStores.map(store => {

                return (
                    <Col key={store._id} sm={12} md={4} lg={3}>
                        <Viewcard name={store.name} owner={store.owner.username} itemsize={store.items.length} id={store._id} />
                    </Col>
                )

            }) } 
            </Row>      
        </div>
    )
}

export default Home
