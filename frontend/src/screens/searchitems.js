import React , { useState , useEffect } from 'react'
import { Row , Col } from 'reactstrap';
import { useDispatch , useSelector } from 'react-redux';
import Viewitemcard from '../components/viewitemcard';
import { useParams } from 'react-router';
import { searchitemAction } from '../actions/itemactions';
import axios from 'axios';

function Searchitems() {

    const [items , setItems] = React.useState([]);

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const dispatch = useDispatch();

    const { id , min , max , text } = useParams();

    const searchitem = useSelector(state => state.searchitem);
    const { loading , error , searchItem } = searchitem;

    useEffect( () => {
        const seeitems = async() => {
        
            try {
            const config = {
                headers: {
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${userInfo.token}`
                }
            }
    
            const { data } = await axios.get(
                `/api/items/searchitem/${id}`,
                { min , max , text },
                config
            )
            setItems(data);

            }

            catch(err) {
                console.log(err);
            }
        }
        seeitems();
    } , [])

    return (
        <div>
            <Row className="Row">
            { searchItem && searchItem.map(item => {

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

export default Searchitems