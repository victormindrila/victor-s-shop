import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

// components
import Layout from '../../components/Layout/Layout';
import BackButton from '../../components/BackButton/BackButton';

//actions
import { clearCart } from '../../store/actions/cart';

import './OrderSummary.css';

function OrderSummary({ products, orderDetails, history, uid, email, clearCart }) {
	const totalSum = (products) => {
		return products.reduce((acc, product) => {
			return acc + product.quantity * product.price;
		}, 0);
	};
	function handleSubmit() {
		const order = {
			email: email,
			uid: uid,
			deliveryAddress: orderDetails.deliveryAddress,
			billingAddress: orderDetails.billingAddress,
			comments: orderDetails.comments,
			products: []
		};

		products.forEach((product) => {
			order.products.push({
				[product.id]: product.quantity
			});
		});

		const authToken = localStorage.getItem('Authorization');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.post('/order', order)
			.then((response) => {
				clearCart();
			})
			.catch((error) => {
				console.log(error);
			});
	}

	return (
		<Layout>
			<div className='cart-page container-fluid container-min-max-width
				d-flex flex-column align-items-center'>
				{products.length ? (
					<div className='w-100'>
						<div className='d-flex justify-content-between'>
							<BackButton goBack={history.goBack} />
							<button
								className='btn btn-outline-dark my-3'
								onClick={(e) => {
									handleSubmit();
								}}>
								Place the order!
							</button>
						</div>

						<div className='d-flex justify-content-between text-center h4 text-bold'>
							<p className='w-25'>Product</p>
							<p className='w-25'>Price</p>
							<p className='w-25'>Quantity</p>
							<p className='w-25'>Total</p>
						</div>
						{products.map((product) => {
							return (
								<div className='d-flex justify-content-between align-items-center text-center' key={product.id}>
									<div className='w-25 d-flex flex-column justify-content-center align-items-center'>
										<p>{product.title}</p>
									</div>
									<p className='w-25'>
										{product.price} {product.currency}
									</p>
									<p className='w-25'>{product.quantity}</p>
									<div className='w-25 d-flex justify-content-center'>
										<p className='mr-2'>
											{product.price * product.quantity} {product.currency}
										</p>
									</div>
								</div>
							);
						})}
						<div className='d-flex justify-content-end border-top'>
							<div className='w-25 d-flex align-items-center justify-content-center'>
								<p className='my-4 text-center font-weight-bold'>Total amount: </p>
							</div>
							<div className='w-25'>
								<p className='my-4 text-center'>
									{totalSum(products)} {products[0].currency}
								</p>
							</div>
						</div>
						<div className='w-25 d-flex align-items-center justify-content-center'>
							<p className='my-4 text-center font-weight-bold'>Delivery address: {orderDetails.deliveryAddress}</p>
						</div>
						<div className='w-25 d-flex align-items-center justify-content-center'>
							<p className='my-4 text-center font-weight-bold'>Billing Address: {orderDetails.billingAddress}</p>
						</div>
					</div>
				) : (
					<div className='d-flex flex-column align-items-center'>
						<p className='h3'>Nothing to display!</p>
						<Link to='/'>
							<button className='btn btn-outline-dark'>Back to home</button>
						</Link>
					</div>
				)}
			</div>
		</Layout>
	);
}

function mapStateToProps(state) {
	return {
		products: state.cart.products,
		orderDetails: state.cart.orderDetails,
		uid: state.user.data.id,
		email: state.user.data.email
	};
}

function mapDispatchToProps(dispatch) {
	return {
		clearCart: () => {
			dispatch(clearCart());
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary);
