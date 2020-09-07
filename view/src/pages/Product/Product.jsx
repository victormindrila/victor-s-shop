import React, { Component } from 'react';
import Layout from '../../components/Layout/Layout';
import { connect } from 'react-redux';

import './Product.scss';
import BackButton from '../../components/BackButton/BackButton';
import WithSpinner from '../../components/HOCs/WithSpinner';

import { addToCart } from '../../store/actions/cart';
import { getUserData } from '../../store/actions/user';
import { selectUserEmail, selectUserData } from '../../store/selectors/user';
import { selectIsFavorite } from '../../store/selectors/user';
import ProductInfo from '../../components/ProductInfo/ProductInfo';

import { fetchProductData, addToFavorites, deleteFromFavorites } from '../../apis/endpoints';

const ProductInfoWithSpinner = WithSpinner(ProductInfo);

class Product extends Component {
	constructor() {
		super();
		this.state = {
			product: '',
			loading: false,
			errors: ''
		};
		this.addToFavorites = this.addToFavorites.bind(this);
	}
	componentDidMount() {
		const productId = this.props.match.params.productId;
		this.setState({ loading: true });
		try {
			fetchProductData(productId, (response) => {
				this.setState({
					loading: false,
					product: response.data
				});
			});
		} catch (error) {
			this.setState({
				errors: error
			});
		}
	}

	async addToFavorites(productId) {
		const { userEmail, userData, getUserData, history, isFavorite } = this.props;

		if (!userData) {
			history.push('/login');
			return;
		}

		if (isFavorite) {
			await deleteFromFavorites(productId, userEmail);
		} else {
			await addToFavorites(productId, userEmail);
		}

		getUserData();
	}

	render() {
		const productId = this.props.match.params.productId;
		const product = this.state.product;
		const { addToCart, isFavorite } = this.props;
		const { loading } = this.state;
		return (
			<Layout title='View Product'>
				<div className='product-page container-fluid container-min-max-width'>
					<BackButton goBack={this.props.history.goBack} />
					<h1 className='my-5 h2'>{product.title}</h1>
					<ProductInfoWithSpinner
						isLoading={loading}
						productId={productId}
						product={product}
						addToCart={addToCart}
						addToFavorites={this.addToFavorites}
						isFavorite={isFavorite}
					/>
				</div>
			</Layout>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	userEmail: selectUserEmail(state),
	userData: selectUserData(state),
	isFavorite: selectIsFavorite(state, ownProps)
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
