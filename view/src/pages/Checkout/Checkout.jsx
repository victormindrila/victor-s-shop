import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// components
import Layout from '../../components/Layout/Layout';
import Error from '../../components/Error/Error';
import Stepper from 'react-stepper-horizontal';
import StripCheckoutButton from '../../components/StripeButton/StripeButton';

import { addOrderDetails, clearCart } from '../../store/actions/cart';
import { selectUserData, selectUserEmail, selectUserId } from '../../store/selectors/user';
import { selectCartProducts, selectCartTotal } from '../../store/selectors/cart';

import './Checkout.css';
import CustomTextarea from '../../components/CustomTextarea/CustomTextarea';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import CartIsEmpty from '../../components/CartIsEmpty/CartIsEmpty';

import { isEmpty } from '../../utils/validators';
import { orderSubmit } from '../../apis/endpoints';

const Buttons = ({ backDisabled, nextDisabled, backFn, nextFn }) => (
	<div className='d-flex justify-content-between'>
		<button disabled={backDisabled} type='button' className='btn btn-outline-dark mb-3 w-25' onClick={(e) => backFn(e)}>
			Back
		</button>

		<button disabled={nextDisabled} type='button' className='btn btn-outline-dark mb-3 w-25' onClick={(e) => nextFn(e)}>
			Next
		</button>
	</div>
);

class Checkout extends React.Component {
	constructor() {
		super();
		this.state = {
			deliveryAddress: '',
			billingAddress: '',
			comments: '',
			error: null,
			currentStep: 1,
			checkoutStates: [ 'deliveryAddress', 'billingAddress', 'comments', 'orderSummary' ],
			steps: [
				{ title: 'Delivery Address' },
				{ title: 'Billing Address' },
				{ title: 'Comments' },
				{ title: 'Order Summary & Payment' }
			]
		};
		this._next = this._next.bind(this);
		this._back = this._back.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSubmit(token) {
		const { deliveryAddress, billingAddress, comments } = this.state;

		if (!this.props.user) {
			this.setState({
				error: 'Please login first!'
			});
			return;
		}

		const { email, uid, products, clearCart } = this.props;

		const normalizedProducts = products.map((product) => ({
			productId: product.id,
			quantity: product.quantity
		}));

		const order = {
			token,
			email,
			uid,
			deliveryAddress,
			billingAddress,
			comments,
			products: normalizedProducts
		};

		try {
			orderSubmit(order, () => {
				clearCart();
			});
		} catch (error) {
			this.setState({
				error: 'Something went wrong'
			});
		}
	}

	_next(e) {
		e.preventDefault();
		let { currentStep } = this.state;
		let currentInput = this.state[this.state.checkoutStates[currentStep - 1]];
		let invalidInput = isEmpty(currentInput);
		if (invalidInput) {
			this.setState({
				error: 'must not be empty'
			});
		} else {
			this.setState({
				error: null,
				currentStep: currentStep >= 3 ? 4 : currentStep + 1
			});
		}
	}

	_back(e) {
		e.preventDefault();
		let { currentStep } = this.state;
		this.setState({
			currentStep: currentStep <= 1 ? 1 : currentStep - 1
		});
	}

	render() {
		const { deliveryAddress, billingAddress, comments, error, currentStep, checkoutStates, steps } = this.state;
		const { products, history, totalSum } = this.props;
		const checkoutState = checkoutStates[currentStep - 1];
		return (
			<Layout title='Checkout'>
				<div className='cart-page container-fluid container-min-max-width
					d-flex flex-column justify-content-center align-items-center'>
					{products.length === 0 ? (
						<CartIsEmpty />
					) : (
						<Fragment>
							<Stepper steps={steps} activeStep={currentStep - 1} />

							<div className='w-75 mt-5'>
								{
									{
										deliveryAddress: (
											<Fragment>
												<CustomTextarea
													className='form-control form-control-lg'
													placeholder='Delivery Address'
													name='deliveryAddress'
													value={deliveryAddress}
													onChange={(e) => this.handleChange(e)}
												/>
												<Buttons backDisabled={true} nextFn={this._next} backFn={this._back} />
											</Fragment>
										),
										billingAddress: (
											<Fragment>
												<CustomTextarea
													className='form-control form-control-lg'
													placeholder='Billing Address'
													name='billingAddress'
													value={billingAddress}
													onChange={(e) => this.handleChange(e)}
												/>
												<Buttons nextFn={this._next} backFn={this._back} />
											</Fragment>
										),
										comments: (
											<Fragment>
												<CustomTextarea
													className='form-control form-control-lg'
													placeholder='Comments'
													name='comments'
													value={comments}
													onChange={(e) => this.handleChange(e)}
												/>
												<Buttons nextFn={this._next} backFn={this._back} />
											</Fragment>
										),
										orderSummary: (
											<Fragment>
												<OrderSummary
													products={products}
													orderDetails={{ deliveryAddress, billingAddress, comments }}
													history={history}
													totalSum={totalSum}
												/>
												<div className='d-flex align-items-center justify-content-center my-5 w-100'>
													<StripCheckoutButton price={totalSum} handleSubmit={this.handleSubmit} />
												</div>
											</Fragment>
										)
									}[checkoutState]
								}

								{error && <Error error={error} />}
							</div>
						</Fragment>
					)}
				</div>
			</Layout>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	products: selectCartProducts,
	user: selectUserData,
	totalSum: selectCartTotal,
	uid: selectUserId,
	email: selectUserEmail
});

const mapDispatchToProps = (dispatch) => ({
	addOrderDetails: (payload) => dispatch(addOrderDetails(payload)),
	clearCart: () => dispatch(clearCart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
