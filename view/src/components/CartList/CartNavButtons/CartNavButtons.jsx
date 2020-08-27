import React from 'react';
import BackButton from '../../BackButton/BackButton';
import { Link } from 'react-router-dom';

function CartNavButtons({ goBack }) {
	return (
		<div className='d-flex justify-content-between'>
			<BackButton goBack={goBack} />
			<Link to='/checkout'>
				<button className='btn btn-outline-dark my-3'>Check Out</button>
			</Link>
		</div>
	);
}

export default CartNavButtons;
