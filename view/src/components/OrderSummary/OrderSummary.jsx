import React from 'react';
import CartIsEmpty from '../CartIsEmpty/CartIsEmpty';
import CartListFooter from '../CartList/CartListFooter/CartListFooter';

const Title = () => <h3 className='my-3'>Products: </h3>;

const OrderDetail = ({ name, details }) => (
	<div className='w-25 d-flex align-items-center justify-content-center'>
		<p className='my-4 text-center font-weight-bold'>
			{name} <span className='mx-2'>{details}</span>
		</p>
	</div>
);

const ProductItem = ({ title, price, currency, quantity, id }) => (
	<div className='d-flex justify-content-between align-items-center text-center' key={id}>
		<div className='w-25 d-flex flex-column justify-content-center align-items-center'>
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
		</div>
	</div>
);

function OrderSummary({ products, orderDetails, totalSum }) {
	return (
		<React.Fragment>
			{products.length ? (
				<div className='w-100'>
					<Title />
					{products.map(({ title, price, currency, quantity, id }) => {
						return <ProductItem title={title} price={price} currency={currency} quantity={quantity} id={id} />;
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
