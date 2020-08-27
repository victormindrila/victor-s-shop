import React from 'react';
import { ReactComponent as Close } from '../../../assets/icons/close.svg';

function CartListItem({ product, removeFromCart }) {
	const { imageUrl, title, price, currency, quantity, id } = product;
	return (
		<div className='d-flex justify-content-between align-items-center text-center' key={product.id}>
			<div className='w-25 d-flex flex-column justify-content-center align-items-center product-wrapper'>
				<img src={imageUrl} alt='Product' />
				<p>{title}</p>
			</div>
			<p className='w-25'>
				{price} {currency}
			</p>
			<p className='w-25'>{quantity}</p>
			<div className='w-25 d-flex justify-content-center'>
				<p className='mr-2'>
					{price * quantity} {currency}
				</p>
				<div onClick={() => removeFromCart({ id })}>
					<Close />
				</div>
			</div>
		</div>
	);
}

export default CartListItem;
