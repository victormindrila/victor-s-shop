import React from 'react';
import Layout from '../../components/Layout/Layout';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//components
import Modal from '../../components/Modal/Modal';

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
			.get(`http://localhost:5000/aligo-test/us-central1/api/admin/product/`, {
				params: {
					productId
				}
			})
			.then((response) => {
				this.setState({
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
			.delete(`http://localhost:5000/aligo-test/us-central1/api/admin/product/${id}`)
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
						<div className='column is-one-third'>
							<div className='card'>
								<div className='card-image'>
									<figure className='image is4by3'>
										<img src={this.state.product.imageUrl} alt='product' />
									</figure>
								</div>
							</div>
						</div>
						<div className='column is-two-thirds'>
							<div className='card'>
								<header className='card-header'>
									<p className='card-header-title'>Description: {this.state.product.description}</p>
								</header>
								<div className='card-content'>
									<p>
										<span> Description: </span> {this.state.product.description}
									</p>
									<p>
										<span> Price: </span> {this.state.product.price}
									</p>
									<p>
										<span> Created at: </span> {this.state.product.createdAt}
									</p>
								</div>
								<footer class='card-footer'>
									<Link to={`/admin/products/edit/${productId}`}>
										<button className='button is-link'>Edit</button>
									</Link>
									<button class='button is-danger' onClick={(e) => this.handleDelete(productId)}>
										Delete
									</button>
								</footer>
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
export default connect(null, mapDispatchToProps)(ViewProduct);
