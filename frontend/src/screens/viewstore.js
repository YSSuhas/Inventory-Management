import React , { useState , useEffect } from 'react'
import { useDispatch , useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { getitemsAction } from '../actions/itemactions';
import Viewitemcard from '../components/viewitemcard';
import { Row , Col } from 'reactstrap';
import './viewstore.css';

function Viewstore() {

    const [min , setMin] = useState(0);
    const [max , setMax] = useState(10000000000);
    const [searchtext , setSearchtext] = useState('');

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const getitems = useSelector( state => state.getitems );
    const { loading , error , getItems } = getitems;

    const { id } = useParams();

    const dispatch = useDispatch();

    let navigate = useNavigate();

    useEffect( () => {
        if(!userInfo) {
            navigate('/login');
        }
        dispatch(getitemsAction(id));
        document.title = "A Store > KART";
    } , [ dispatch ])

    const clickHandler = (e) => {
        e.preventDefault();
        navigate(`/add-item/${id}`);
    }

    const searchHandler = (e) => {
        e.preventDefault();
        navigate(`/search-items/${id}/${min}/${max}/${searchtext}`);
    }

    return (
        <div>
            <h1>{getItems && getItems.name}</h1>
            <button onClick={clickHandler}>Add Item</button>
            <form onSubmit={searchHandler}>
                <input 
                        type="number" 
                        value={min} 
                        placeholder="Minimum Price" 
                        onChange={(e) => setMin(e.target.value)} 
                />
                <input 
                        type="number" 
                        value={max} 
                        placeholder="Maximum Price" 
                        onChange={(e) => setMax(e.target.value)} 
                />
                <input 
                    placeholder="Search" 
                    type="text" 
                    value={searchtext} 
                    onChange={ (e) => setSearchtext(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            <Row className="Row">
            { getItems && getItems.items && getItems.items.map(item => {

                return (
                    <Col key={item._id} sm={12} md={4} lg={3}>
                        <Viewitemcard name={item.name} stock={item.stock} reserve={item.reserve} priceperunit={item.priceperunit} id={id} itemID={item._id} />
                    </Col>
                )

            }) 
            }
            </Row>
        </div>
    )
}

export default Viewstore
