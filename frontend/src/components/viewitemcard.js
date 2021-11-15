import React , { useState } from 'react'
import { Card } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { updateitemAction } from '../actions/itemactions';

function Viewitemcard({ name , stock , reserve , priceperunit , id , itemID }) {

    const [update , setUpdate] = useState(false);
    const [updatestock, setUpdatestock] = useState(0);
    const [updatereserve, setUpdatereserve] = useState(0);

    const dispatch = useDispatch();

	const submitHandler = (e) => {
        e.preventDefault();
        setUpdate(false);
		dispatch(updateitemAction(id , itemID , updatestock , updatereserve));
	}

    return (
        <div>
            { update === false ? 
            <Card>
				<Card.Body>
					<Card.Title>{name}</Card.Title>
					<Card.Text>Stock: {stock}</Card.Text>
                    <Card.Text>Reserve: {reserve}</Card.Text>
                    <Card.Text>Price: {priceperunit}</Card.Text>
					<button onClick={() => {setUpdate(true)} }>Update</button>
				</Card.Body>
			</Card> :
            <form onSubmit={submitHandler}>
                <h2>{name}</h2>
                <input 
                    type="number" 
                    value={updatestock} 
                    placeholder="Add items" 
                    onChange={(e) => {setUpdatestock(e.target.value)}} 
                />
                <input 
                    type="number" 
                    value={updatereserve} 
                    placeholder="Add reserves" 
                    onChange={(e) => {setUpdatereserve(e.target.value)}} 
                />
                <button type="submit">Update Item</button>
                <button onClick={() => {setUpdate(false)} }>Back</button>
            </form>
            }
        </div>
    )
}

export default Viewitemcard