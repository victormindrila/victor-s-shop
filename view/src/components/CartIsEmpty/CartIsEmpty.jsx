import React from 'react';
import { Link } from 'react-router-dom';

function CartIsEmpty() {
	return (
		<div className='d-flex flex-column align-items-center'>
			<p className='h3'>No products to display!</p>
			<Link to='/'>
				<button className='btn btn-outline-dark'>Back to home</button>
			</Link>
		</div>
	);
}

export default CartIsEmpty;
