import React, { useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import { connect } from 'react-redux';

//actions
import { addProduct, updateSuccessProduct } from '../../store/actions/product';
import { getAllProducts } from '../../store/actions/products';

// components
import Error from '../../components/Error/Error';
import Loader from '../../components/Loader/Loader';

class NewProduct extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			description: '',
			price: '',
			image: ''
		};
	}

	componentDidUpdate() {
		const { getAllProducts, updateSuccessProduct } = this.props;
		if (this.props.product.success) {
			getAllProducts();
			updateSuccessProduct('');
			this.props.history.push('/admin/products');
		}
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleImageChange(e) {
		this.setState({
			image: e.target.files[0]
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		const { addProduct } = this.props;
		const productData = {
			description: this.state.description,
			price: this.state.price
		};
		const { image } = this.state;

		addProduct(productData, image);
	}

	render() {
		return (
			<Layout>
				<div className='columns is-centered'>
					<div className='column is-half'>
						<h1 className='subtitle'>Create Product</h1>

						<form
							onSubmit={(e) => {
								this.handleSubmit(e);
							}}>
							<div className='field'>
								<label className='label'>Description</label>
								<input
									className='input'
									placeholder='description'
									name='description'
									onChange={(e) => this.handleChange(e)}
								/>
							</div>

							<div className='field'>
								<label className='label'>Price</label>
								<input className='input' placeholder='price' name='price' onChange={(e) => this.handleChange(e)} />
							</div>

							<div className='field'>
								<label className='label button is-primary'>
									Upload an image
									<input
										className='button is-link'
										type='file'
										name='image'
										onChange={(e) => this.handleImageChange(e)}
									/>
								</label>
							</div>
							<br />
							<button className='button is-primary'>Create</button>
						</form>
						{this.props.product.loading && <Loader />}
					</div>
				</div>
			</Layout>
		);
	}
}

function mapStateToProps(state) {
	return {
		userData: state.user.data,
		product: state.product
	};
}

function mapDispatchToProps(dispatch) {
	return {
		addProduct: (productData, productImage) => {
			dispatch(addProduct(productData, productImage));
		},
		getAllProducts: () => {
			dispatch(getAllProducts());
		},
		updateSuccessProduct: () => {
			dispatch(updateSuccessProduct());
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProduct);

// todo
// add category filed
// add new field button
// validate inputs

// <div>
// <button className='button is-primary' id='add-feature'>
// 	<i className='fas fa-plus-circle' />{' '}
// </button>
// </div>
// <div className='select'>
// <label className='label'>Category</label>
// <select id='category' name='categoryId' />
// </div>
