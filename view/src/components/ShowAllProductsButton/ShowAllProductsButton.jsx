import React from 'react';
import { Link } from 'react-router-dom';

function ShowAllProductsButton() {
	return (
		<div>
			<hr />
			<div className='d-flex justify-content-center'>
				<Link to='/products/'>
					<button className='btn btn-outline-dark my-3'>View all products</button>
				</Link>
			</div>
			<hr />
		</div>
	);
}

export default ShowAllProductsButton;
