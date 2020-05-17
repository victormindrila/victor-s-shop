import React, { Component } from 'react';
import Layout from '../../components/Layout/Layout';
import { connect } from 'react-redux';
// import { addToCart } from '../redux/actions/cart';

import axios from 'axios';
import Loader from '../../components/Loader/Loader';

import { getAllProducts } from '../../store/actions/products';
import { getAllCategories } from '../../store/actions/categories';

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

	render() {
		const product = this.state.product;
		const { addToCart } = this.props;
		return (
			<Layout>
				<div className='product-page container-fluid container-min-max-width'>
					<button className='btn btn-outline-dark my-3' onClick={() => this.props.history.goBack()}>
						Back
					</button>

					<h1 className='my-5 h2'>{product.title}</h1>
					<div className='product-info d-flex'>
						<div className='image-wrapper d-flex mr-5'>
							<img src={product.imageUrl} alt='Product presentation' />
							{this.state.loading && <Loader />}
						</div>
						<div className='product-details'>
							<p className='h3 text-danger'>
								{product.price} {product.currency}
							</p>
							<button
								className='btn btn-dark mb-4 font-weight-bold'
								onClick={() => {
									this.props.addToCart({
										product: {
											id: product.id,
											name: product.name,
											price: product.price,
											currency: product.currency,
											image: product.image
										}
									});
								}}>
								Add To Cart
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

function mapDispatchToProps(dispatch) {
	return {
		getAllProducts: () => {
			dispatch(getAllProducts());
		},
		getAllCategories: () => {
			dispatch(getAllCategories());
		}
	};
}

function mapStateToProps(state) {
	return {
		products: state.products,
		categories: state.categories
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
