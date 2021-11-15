import React , { useState , useEffect } from 'react'
import { additemAction } from '../actions/itemactions';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

function Additem() {

    const [name, setName] = useState('');
    const [stock, setStock] = useState(0);
    const [reserve, setReserve] = useState(0);
    const [priceperunit, setPriceperunit] = useState(0);

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const { id } = useParams();

    const dispatch = useDispatch();

    let navigate = useNavigate();

    useEffect( () => {
        if(!userInfo) {
            navigate('/login');
        }
        document.title = "Add Item > KART";
    } , [ dispatch ])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(additemAction(id,name, stock, reserve, priceperunit));
        navigate(`/store/${id}`);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={name} 
                    placeholder="Item name" 
                    onChange={(e) => {setName(e.target.value)}} 
                />
                <input 
                    type="number" 
                    value={stock} 
                    placeholder="Items in stock" 
                    onChange={(e) => {setStock(e.target.value)}} 
                />
                <input 
                    type="number" 
                    value={reserve} 
                    placeholder="Items for reserve" 
                    onChange={(e) => {setReserve(e.target.value)}} 
                />
                <input 
                    type="number" 
                    value={priceperunit} 
                    placeholder="Price per unit" 
                    onChange={(e) => {setPriceperunit(e.target.value)}} 
                />
                <button type="submit">Add Item</button>
            </form>
        </div>
    )
}

export default Additem
