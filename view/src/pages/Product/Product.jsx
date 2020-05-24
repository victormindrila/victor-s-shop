import React, { Component } from 'react';
import Layout from '../../components/Layout/Layout';
import { connect } from 'react-redux';
import axios from 'axios';

import './Product.css';
import BackButton from '../../components/BackButton/BackButton';

import { addToCart } from '../../store/actions/cart';
import { getUserData } from '../../store/actions/user';

class Product extends Component {
	constructor() {
		super();
		this.state = {
			product: '',
			loading: true,
			errors: ''
		};
	}
	componentDidMount() {
		const productId = this.props.match.params.productId;
		axios
			.get(`/product/`, {
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

	addToFavorites(productId) {
		const userEmail = this.props.user && this.props.user.email;
		const { getUserData } = this.props;
		const authToken = localStorage.getItem('Authorization');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.post('/favorite/', {
				productId,
				userEmail
			})
			.then((response) => {
				getUserData();
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		const productId = this.props.match.params.productId;
		const product = this.state.product;
		const { addToCart } = this.props;
		return (
			<Layout>
				<div className='product-page container-fluid container-min-max-width'>
					<BackButton goBack={this.props.history.goBack} />
					<h1 className='my-5 h2'>{product.title}</h1>
					<div className='product-info d-flex mb-5'>
						<div className='image-wrapper d-flex justify-content-center align-items-center mr-5'>
							<img src={product.imageUrl} alt='Product presentation' />
						</div>
						<div className='product-details'>
							<p className='h3 text-danger'>
								{product.price} {product.currency}
							</p>
							<button
								className='btn btn-dark mb-4 font-weight-bold'
								onClick={() => {
									addToCart({
										product: {
											id: productId,
											title: product.title,
											price: product.price,
											currency: product.currency,
											imageUrl: product.imageUrl
										}
									});
								}}>
								Add To Cart
							</button>
							<button
								className='btn btn-dark mb-4 font-weight-bold ml-3'
								onClick={() => {
									this.addToFavorites(productId);
								}}>
								Add To Favorites
							</button>
							<p>
								<span className='font-weight-bold'>Item Number</span>: {product.itemNumber}
							</p>
							<p>
								<span className='font-weight-bold'>Brand</span>: {product.brand}
							</p>
							<p>
								<span className='font-weight-bold'>Material</span>: {product.material}
							</p>
							<p>
								<span className='font-weight-bold'>Weight</span>: {product.weight}
							</p>
							<p className='font-weight-bold mb-1'>Description:</p>
							<p>{product.description}</p>
						</div>
					</div>
				</div>
			</Layout>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.user.data
	};
}

function mapDispatchToProps(dispatch) {
	return {
		addToCart: (product) => dispatch(addToCart(product)),
		getUserData: () => {
			dispatch(getUserData());
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
