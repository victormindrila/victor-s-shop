import React from 'react';

function CartListHeader() {
	return (
		<div className='d-flex justify-content-between text-center h4 text-bold'>
			<p className='w-25'>Product</p>
			<p className='w-25'>Price</p>
			<p className='w-25'>Quantity</p>
			<p className='w-25'>Total</p>
		</div>
	);
}

export default CartListHeader;
