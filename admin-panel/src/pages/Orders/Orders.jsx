import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// components
import Layout from '../../components/Layout/Layout';
import Loader from '../../components/Loader/Loader';
import Modal from '../../components/Modal/Modal';
import Pagination from '../../components/Pagination/Pagination';

//helpers
import axios from 'axios';
import { chunkArray } from '../../utils/helpers';
import {
	NUMBER_OF_PRODUCTS_ON_PAGE,
	PAGINATION_STYLE,
	PAGINATION_SIZE,
	NUMBER_OF_PAGINATION_ELEMENTS,
	PAGINATION_ALIGNMENT
} from '../../constants/pagination';

class Orders extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			orders: [],
			loading: true,
			displayModal: false,
			modalError: '',
			success: '',
			pageNumber: 1
		};
	}

	componentWillReceiveProps(props) {
		const pageNumber = this.props.history.location.search.split('?page=')[1] || 1;
		this.setState({
			pageNumber: pageNumber
		});
	}

	componentDidMount() {
		this.fetchOrders();
		const pageNumber = this.props.history.location.search.split('?page=')[1] || 1;
		this.setState({
			pageNumber: pageNumber
		});
	}

	fetchOrders() {
		const authToken = localStorage.getItem('Authorization');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.get('/admin/orders')
			.then((response) => {
				this.setState({
					orders: response.data,
					loading: false
				});
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

	pageLink(no) {
		if (no === 1) return '/admin/orders/';

		return `/admin/orders/?page=${no}`;
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
					this.fetchOrders();
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
		const { orders, pageNumber, loading, modalError, success, displayModal } = this.state;

		const displayedOrders = chunkArray(orders, NUMBER_OF_PRODUCTS_ON_PAGE);

		const numberOfPages = Math.ceil(orders.length / NUMBER_OF_PRODUCTS_ON_PAGE);

		if (this.props.user.loading) {
			return <Loader />;
		} else {
			return (
				<Layout>
					<Modal error={modalError} message={success} active={displayModal} />
					<div className='control'>
						<h1 className='subtitle'>Orders</h1>
						{loading ? <Loader /> : null}
					</div>
					{displayedOrders[pageNumber - 1] && (
						<table className='table'>
							<thead>
								<tr>
									<th>User Name</th>
									<th>Date</th>
									<th>Status</th>
									<th>View Order</th>
									<th>Delete</th>
								</tr>
							</thead>
							<tbody>
								{displayedOrders[pageNumber - 1].map((order) => {
									return (
										<tr key={order.id}>
											<td>{order.userName}</td>
											<td>{order.createdAt}</td>
											<td>{order.completed ? 'shipped' : 'pending'}</td>
											<td>
												<Link to={`/admin/orders/view/${order.id}`}>
													<button className='button is-link'>View</button>
												</Link>
											</td>
											<td>
												<button className='button is-danger' onClick={(e) => this.handleDelete(order.id)}>
													Delete
												</button>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					)}

					<Pagination
						total={numberOfPages}
						active={pageNumber}
						size={PAGINATION_SIZE}
						style={PAGINATION_STYLE}
						alignment={PAGINATION_ALIGNMENT}
						show={NUMBER_OF_PAGINATION_ELEMENTS}
						pageLink={this.pageLink}
					/>
				</Layout>
			);
		}
	}
}

function mapStateToProps(state) {
	return {
		user: state.user.data
	};
}

export default withRouter(connect(mapStateToProps)(Orders));
