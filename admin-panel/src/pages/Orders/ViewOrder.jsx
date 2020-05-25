import React from 'react';
import Layout from '../../components/Layout/Layout';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

//components
import Modal from '../../components/Modal/Modal';
import Loader from '../../components/Loader/Loader';

//actions
import { getAllProducts } from '../../store/actions/products';

//helpers
import axios from 'axios';

class ViewOrder extends React.Component {
	constructor() {
		super();
		this.state = {
			order: '',
			loading: true,
			displayModal: false,
			modalError: '',
			errors: '',
			success: ''
		};
	}

	componentDidMount() {
		this.fetchOrderData();
	}

	fetchOrderData() {
		const orderId = this.props.match.params.orderId;
		const authToken = localStorage.getItem('Authorization');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.get(`/admin/order/`, {
				params: {
					orderId
				}
			})
			.then((response) => {
				this.setState({
					loading: false,
					order: response.data
				});
			})
			.catch((error) => {
				this.setState({
					errors: error
				});
			});
	}

	handleShipped(id) {
		this.setState({
			loading: true
		});
		const orderData = {
			completed: true
		};
		const authToken = localStorage.getItem('Authorization');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.put(`/admin/order/${id}`, orderData)
			.then((response) => {
				this.setState({
					loading: false,
					displayModal: true,
					success: response.data.message
				});
				setTimeout(() => {
					this.setState({
						displayModal: false
					});
					this.fetchOrderData();
				}, 1500);
			})
			.catch((error) => {
				console.dir(error);
				this.setState({
					displayModal: true,
					loading: false,
					modalError: error.response.data.error
				});
				setTimeout(() => {
					this.setState({
						displayModal: false,
						modalError: ''
					});
				}, 1500);
			});
	}

	handleDelete(id) {
		const authToken = localStorage.getItem('Authorization');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.delete(`/admin/order/${id}`)
			.then((response) => {
				this.setState({
					displayModal: true,
					success: response.data.message
				});
				setTimeout(() => {
					this.setState({
						displayModal: false
					});
					this.props.history.push('/admin/orders');
				}, 1500);
			})
			.catch((error) => {
				this.setState({
					displayModal: true,
					modalError: error.response.data.error
				});
				setTimeout(() => {
					this.setState({
						displayModal: false,
						modalError: ''
					});
				}, 1500);
			});
	}
	render() {
		const orderId = this.props.match.params.orderId;
		const { modalError, success, displayModal, loading, order } = this.state;
		return (
			<Layout>
				<Modal error={modalError} message={success} active={displayModal} />
				<div className='container'>
					<div className='columns'>
						<div className='column is-two-thirds'>
							<div className='card'>
								{loading && <Loader />}
								<header className='card-header'>
									<p className='card-header-title is-uppercase is-size-4'>PRODUCTS</p>
								</header>
								<div className='card-content'>
									<table className='table'>
										<thead>
											<tr>
												<th>Product Name</th>
												<th className='has-text-right'>Product Price</th>
												<th className='has-text-right'>Quantity </th>
												<th className='has-text-right'>Value</th>
											</tr>
										</thead>
										<tbody>
											{order &&
												order.products.map((product) => {
													const { title, price, currency } = product.details;
													const { quantity, productId } = product;
													return (
														<tr key={productId}>
															<td>
																<Link to={`/admin/products/view/${productId}`}>{title}</Link>
															</td>
															<td className='has-text-right'>{price + currency}</td>
															<td className='has-text-right'>{quantity}</td>
															<td className='has-text-right'>{`${quantity * price} ${currency}`}</td>
														</tr>
													);
												})}
											<tr>
												<td />
												<td />
												<td className='has-text-right'>Total</td>
												<td className='has-text-right'>
													{order &&
														order.products.reduce((acc, item) => {
															return Math.round(acc + Number(item.details.price * item.quantity));
														}, 0)}
													EUR
												</td>
											</tr>
										</tbody>
									</table>
								</div>

								<footer className='card-footer'>
									<button className='button is-primary' onClick={(e) => this.handleShipped(orderId)}>
										Shipped
									</button>
									<button className='button is-danger' onClick={(e) => this.handleDelete(orderId)}>
										Delete
									</button>
								</footer>
							</div>
						</div>
						<div className='column is-one-third'>
							<header className='card-header'>
								<p className='card-header-title is-uppercase is-size-4'>ORDER DETAILS</p>
							</header>
							<div className='card'>
								<table>
									<tbody>
										<tr>
											<td>User Name</td>
											<td>{order.userName}</td>
										</tr>
										<tr>
											<td>Email</td>
											<td>{order.email}</td>
										</tr>
										<tr>
											<td>Created At</td>
											<td>{order.createdAt}</td>
										</tr>

										<tr>
											<td>Delivery Address</td>
											<td>{order.deliveryAddress}</td>
										</tr>
										<tr>
											<td>Billing Address</td>
											<td>{order.billingAddress}</td>
										</tr>
										<tr>
											<td>Comments</td>
											<td>{order.comments}</td>
										</tr>
										<tr>
											<td>Status</td>
											<td>{order.completed ? 'shipped' : 'pending'}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getAllProducts: () => {
			dispatch(getAllProducts());
		}
	};
}
export default withRouter(connect(null, mapDispatchToProps)(ViewOrder));
