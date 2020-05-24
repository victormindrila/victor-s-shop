import React from 'react';
import { connect } from 'react-redux';

// components
import Layout from '../../components/Layout/Layout';
import BackButton from '../../components/BackButton/BackButton';
import Error from '../../components/Error/Error';

import { addOrderDetails } from '../../store/actions/cart';

import './Checkout.css';

class Checkout extends React.Component {
	constructor() {
		super();
		this.state = {
			deliveryAddress: '',
			billingAddress: '',
			comments: '',
			error: ''
		};
	}
	componentDidMount() {
		this.setState({
			deliveryAddress: this.props.orderDetails.deliveryAddress,
			billingAddress: this.props.orderDetails.billingAddress,
			comments: this.props.orderDetails.comments
		});
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSubmit(e) {
		const { addOrderDetails } = this.props;
		e.preventDefault();
		const orderDetails = {
			deliveryAddress: this.state.deliveryAddress,
			billingAddress: this.state.billingAddress,
			comments: this.state.comments
		};

		addOrderDetails(orderDetails);
		if (!this.props.user) {
			this.setState({
				error: 'Please login first!'
			});
			return;
		}
		this.props.history.push('/order-summary');
	}

	render() {
		return (
			<Layout>
				<div className='cart-page container-fluid container-min-max-width
                    d-flex flex-column justify-content-center align-items-center'>
					<div className='d-flex justify-content-between w-100'>
						<BackButton goBack={this.props.history.goBack} />
					</div>
					<div className='columns is-centered is-vcentered'>
						<div className='column is-one-quarter'>
							<h2>Please provide the following details: </h2>
							<form onSubmit={(e) => this.handleSubmit(e)}>
								<div className='form-group'>
									<label className='label'>Delivery Address: </label>
									<textarea
										className='form-control form-control-lg'
										placeholder='Delivery Address'
										name='deliveryAddress'
										value={this.state.deliveryAddress}
										onChange={(e) => this.handleChange(e)}
									/>
								</div>
								<div className='form-group'>
									<label className='label'>Billing Address: </label>
									<textarea
										className='form-control form-control-lg'
										placeholder='Billing Address'
										name='billingAddress'
										value={this.state.billingAddress}
										onChange={(e) => this.handleChange(e)}
									/>
								</div>
								<div className='form-group'>
									<label className='label'>Comments: </label>
									<textarea
										className='form-control form-control-lg'
										placeholder='Comments'
										name='comments'
										value={this.state.comments}
										onChange={(e) => this.handleChange(e)}
									/>
								</div>
								{this.state.error && <Error error={this.state.error} />}
								<button className='btn btn-outline-dark mb-3 form-control form-control-lg'>Submit</button>
							</form>
						</div>
					</div>
				</div>
			</Layout>
		);
	}
}

function mapStateToProps(state) {
	return {
		products: state.cart.products,
		orderDetails: state.cart.orderDetails,
		user: state.user.data
	};
}

function mapDispatchToProps(dispatch) {
	return {
		addOrderDetails: (payload) => dispatch(addOrderDetails(payload))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
