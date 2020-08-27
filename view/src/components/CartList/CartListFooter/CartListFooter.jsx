import React from 'react';

function CartListFooter({ total, currency }) {
	return (
		<div className='d-flex justify-content-end border-top'>
			<div className='w-25 d-flex align-items-center justify-content-center'>
				<p className='my-4 text-center font-weight-bold'>Total amount: </p>
			</div>
			<div className='w-25'>
				<p className='my-4 text-center'>
					{total.toFixed(2)} {currency}
				</p>
			</div>
		</div>
	);
}

export default CartListFooter;
