import React from 'react'
import { Card } from 'react-bootstrap'
import { useNavigate } from 'react-router';


function Viewcard({ name , owner , itemsize , id }) {

    let navigate = useNavigate();

	const enterShopHandler = () => {
		navigate(`/store/${id}`);
	}

    return (
        <div>
            <Card>
				<Card.Body>
					<Card.Title>{name}</Card.Title>
					<Card.Subtitle className='mb-2 text-muted'>
						Owner {owner}
					</Card.Subtitle>
					<Card.Text>Total items present {itemsize}</Card.Text>
					<button variant='dark' onClick={enterShopHandler}>Enter</button>
				</Card.Body>
			</Card>
        </div>
    )
}

export default Viewcard
