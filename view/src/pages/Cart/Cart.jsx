import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// components
import Layout from '../../components/Layout/Layout';
import BackButton from '../../components/BackButton/BackButton';

import { removeFromCart } from '../../store/actions/cart';

import './Cart.css';
import { ReactComponent as Close } from '../../assets/icons/close.svg';

function Cart(props) {
	const totalSum = (products) => {
		return products.reduce((acc, product) => {
			return acc + product.quantity * product.price;
		}, 0);
	};

	return (
		<Layout>
			<div className='cart-page container-fluid container-min-max-width
				d-flex flex-column justify-content-center align-items-center'>
				{props.products.length ? (
					<div className='w-100'>
						<div className='d-flex justify-content-between'>
							<BackButton goBack={props.history.goBack} />
							<Link to='/checkout'>
								<button className='btn btn-outline-dark my-3'>Check Out</button>
							</Link>
						</div>

						<div className='d-flex justify-content-between text-center h4 text-bold'>
							<p className='w-25'>Product</p>
							<p className='w-25'>Price</p>
							<p className='w-25'>Quantity</p>
							<p className='w-25'>Total</p>
						</div>
						{props.products.map((product) => {
							return (
								<div className='d-flex justify-content-between align-items-center text-center' key={product.id}>
									<div className='w-25 d-flex flex-column justify-content-center align-items-center product-wrapper'>
										<img src={product.imageUrl} alt='Product' />
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
										<div onClick={() => props.removeFromCart({ id: product.id })}>
											<Close />
										</div>
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
									{totalSum(props.products).toFixed(2)} {props.products[0].currency}
								</p>
							</div>
						</div>
					</div>
				) : (
					<div className='d-flex flex-column align-items-center'>
						<p className='h3'>Cart is empty!</p>
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
		products: state.cart.products
	};
}

function mapDispatchToProps(dispatch) {
	return {
		removeFromCart: (payload) => dispatch(removeFromCart(payload))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
