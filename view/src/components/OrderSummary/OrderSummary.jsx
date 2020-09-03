import React from 'react';
import CartIsEmpty from '../CartIsEmpty/CartIsEmpty';
import CartListFooter from '../CartList/CartListFooter/CartListFooter';

const OrderDetail = ({ name, details }) => (
	<div className='w-100'>
		<p className='my-4 font-weight-bold'>
			{name} <span className='mx-2'>{details}</span>
		</p>
	</div>
);

const ProductItem = ({ title, price, currency, quantity }) => (
	<div className='d-flex justify-content-between align-items-center text-center'>
		<div className='w-25 d-flex flex-column justify-content-start'>
			<p className='text-left'>{title}</p>
		</div>

		<p className='w-25 text-right'>{quantity} pcs</p>
		<div className='w-25 d-flex justify-content-end'>
			<p className='mr-2 text-right'>
				{price * quantity} {currency}
			</p>
		</div>
	</div>
);

function OrderSummary({ products, orderDetails, totalSum }) {
	return (
		<React.Fragment>
			{products.length ? (
				<div className='w-100'>
					{products.map(({ title, price, currency, quantity, id }) => {
						return <ProductItem title={title} price={price} currency={currency} quantity={quantity} key={id} />;
					})}
					<CartListFooter total={totalSum} currency='EUR' />
					<OrderDetail name='Delivery Address: ' details={orderDetails.deliveryAddress} />
					<OrderDetail name='Billing Address: ' details={orderDetails.billingAddress} />
					<OrderDetail name='Comments: ' details={orderDetails.comments} />
				</div>
			) : (
				<CartIsEmpty />
			)}
		</React.Fragment>
	);
}

export default OrderSummary;
