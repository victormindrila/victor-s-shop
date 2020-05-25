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

class ViewProduct extends React.Component {
	constructor() {
		super();
		this.state = {
			product: '',
			loading: true,
			displayModal: false,
			modalError: '',
			errors: '',
			success: ''
		};
	}

	componentDidMount() {
		const productId = this.props.match.params.productId;
		const authToken = localStorage.getItem('Authorization');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.get(`/admin/product/`, {
				params: {
					productId
				}
			})
			.then((response) => {
				this.setState({
					loading: false,
					product: response.data
				});
			})
			.catch((error) => {
				this.setState({
					errors: error
				});
			});
	}

	handleDelete(id) {
		const authToken = localStorage.getItem('Authorization');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.delete(`/admin/product/${id}`)
			.then((response) => {
				this.setState({
					displayModal: true,
					success: response.data.message
				});
				setTimeout(() => {
					this.setState({
						displayModal: false
					});
					this.props.getAllProducts();
					this.props.history.push('/admin/products');
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
		const productId = this.props.match.params.productId;
		return (
			<Layout>
				<Modal error={this.state.modalError} message={this.state.success} active={this.state.displayModal} />
				<div className='container'>
					<div className='columns'>
						<div className='column is-two-thirds'>
							<div className='card'>
								{this.state.loading && <Loader />}
								<header className='card-header'>
									<p className='card-header-title is-uppercase is-size-4'>{this.state.product.title}</p>
								</header>
								<div className='card-content'>
									<table>
										<tbody>
											<tr>
												<td>
													<span className='has-text-weight-bold'> Title: </span>
												</td>
												<td> {this.state.product.title}</td>
											</tr>
											<tr>
												<td>
													<span className='has-text-weight-bold'> Item Number: </span>
												</td>
												<td> {this.state.product.itemNumber}</td>
											</tr>
											<tr>
												<td>
													<span className='has-text-weight-bold'> Price: </span>{' '}
												</td>
												<td>{this.state.product.price}</td>
											</tr>
											<tr>
												<td>
													<span className='has-text-weight-bold'> Currency: </span>
												</td>
												<td>{this.state.product.currency}</td>
											</tr>
											<tr>
												<td>
													<span className='has-text-weight-bold'> Brand: </span>
												</td>
												<td>{this.state.product.brand}</td>
											</tr>
											<tr>
												<td>
													<span className='has-text-weight-bold'> Material: </span>{' '}
												</td>
												<td>{this.state.product.material}</td>
											</tr>
											<tr>
												<td>
													<span className='has-text-weight-bold'> Weight: </span>{' '}
												</td>
												<td>{this.state.product.weight}</td>
											</tr>
											<tr>
												<td>
													<span className='has-text-weight-bold'> Description: </span>
												</td>
												<td>{this.state.product.description}</td>
											</tr>
											<tr>
												<td>
													<span className='has-text-weight-bold'> Category: </span>{' '}
												</td>
												<td>{this.state.product.category}</td>
											</tr>
											<tr>
												<td>
													<span className='has-text-weight-bold'> Created at: </span>
												</td>
												<td>{this.state.product.createdAt}</td>
											</tr>
										</tbody>
									</table>
								</div>

								<footer className='card-footer'>
									<Link to={`/admin/products/edit/${productId}`}>
										<button className='button is-link'>Edit</button>
									</Link>
									<button className='button is-danger' onClick={(e) => this.handleDelete(productId)}>
										Delete
									</button>
								</footer>
							</div>
						</div>
						<div className='column is-one-third'>
							<div className='card'>
								<div className='card-image'>
									<figure className='image is4by3'>
										<img src={this.state.product.imageUrl} alt='product' />
									</figure>
								</div>
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
export default withRouter(connect(null, mapDispatchToProps)(ViewProduct));
