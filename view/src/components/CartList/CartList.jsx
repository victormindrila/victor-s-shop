import React from 'react';

import CartNavButtons from './CartNavButtons/CartNavButtons';
import CartListFooter from './CartListFooter/CartListFooter';
import CartListHeader from './CartListHeader/CartListHeader';
import CartListItem from './CartListItem/CartListItem';

function CartList({ goBack, products, removeFromCart, total }) {
	return (
		<div className='w-100'>
			<CartNavButtons goBack={goBack} />
			<CartListHeader />
			{products.map((product) => {
				return <CartListItem product={product} removeFromCart={removeFromCart} key={product.id} />;
			})}
			<CartListFooter total={total} currency={products[0].currency} />
		</div>
	);
}

export default CartList;
