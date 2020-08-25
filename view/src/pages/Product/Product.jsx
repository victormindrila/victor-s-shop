import React, { Component } from 'react';
import Layout from '../../components/Layout/Layout';
import { connect } from 'react-redux';
import axios from 'axios';
import { createStructuredSelector } from 'reselect';

import './Product.scss';
import BackButton from '../../components/BackButton/BackButton';

import { addToCart } from '../../store/actions/cart';
import { getUserData } from '../../store/actions/user';
import { selectUserData } from '../../store/selectors/user';
import ProductInfo from '../../components/ProductInfo/ProductInfo';
import Loader from '../../components/Loader/Loader';

class Product extends Component {
	constructor() {
		super();
		this.state = {
			product: '',
			loading: true,
			errors: ''
		};
		this.addToFavorites = this.addToFavorites.bind(this);
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
		const { loading } = this.state;
		return (
			<Layout>
				<div className='product-page container-fluid container-min-max-width'>
					<BackButton goBack={this.props.history.goBack} />
					<h1 className='my-5 h2'>{product.title}</h1>
					{loading ? (
						<Loader />
					) : (
						<ProductInfo
							productId={productId}
							product={product}
							addToCart={addToCart}
							addToFavorites={this.addToFavorites}
						/>
					)}
				</div>
			</Layout>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	user: selectUserData
});

function mapDispatchToProps(dispatch) {
	return {
		addToCart: (product) => dispatch(addToCart(product)),
		getUserData: () => {
			dispatch(getUserData());
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
