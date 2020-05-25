import React from 'react';
import Layout from '../../components/Layout/Layout';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//actions
import { getAllProducts } from '../../store/actions/products';

// components
import Error from '../../components/Error/Error';
import Loader from '../../components/Loader/Loader';
import Modal from '../../components/Modal/Modal';
import Dropdown from '../../components/Dropdown/Dropdown';

// helpers
import { validateNewProductData } from '../../utils/validators';
import axios from 'axios';

class NewProduct extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			itemNumber: '',
			brand: '',
			price: '',
			currency: '',
			material: '',
			weight: '',
			description: '',
			image: '',
			category: '',
			fetchedCategories: [],
			loading: true,
			displayModal: false,
			modalError: '',
			errors: '',
			success: ''
		};
	}

	componentDidMount() {
		this.fetchCategories();
	}

	fetchCategories() {
		const authToken = localStorage.getItem('Authorization');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.get('/admin/categories')
			.then((response) => {
				this.setState({
					fetchedCategories: response.data,
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

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.name === 'image' ? e.target.files[0] : e.target.value
		});
	}

	handleClick(e, id) {
		e.preventDefault();
		this.setState({
			category: id
		});
	}
	handleSubmit(e) {
		e.preventDefault();
		const productData = {
			title: this.state.title,
			itemNumber: this.state.itemNumber,
			brand: this.state.brand,
			price: Number(this.state.price),
			currency: this.state.currency,
			material: this.state.material,
			weight: this.state.weight,
			description: this.state.description,
			category: this.state.category
		};
		const { image } = this.state;

		const { valid, errors } = validateNewProductData(productData);

		if (!valid) this.setState({ errors: errors });
		if (valid) {
			this.setState({
				loading: true
			});
			const authToken = localStorage.getItem('Authorization');
			axios.defaults.headers.common = { Authorization: `${authToken}` };
			let createProductResponse;
			axios
				.post('/admin/product', productData)
				.then((response) => {
					createProductResponse = response.data.message;
					const formData = new FormData();
					formData.append('productId', response.data.product.id);
					formData.append('image', image);
					return axios.post('/admin/product/image', formData, {
						headers: {
							'content-type': 'multipart/form-data'
						}
					});
				})
				.then((response) => {
					this.setState({
						loading: false,
						displayModal: true,
						success: createProductResponse
					});
					setTimeout(() => {
						this.props.getAllProducts();
						this.props.history.push('/admin/products');
					}, 1500);
				})
				.catch((error) => {
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
	}

	render() {
		const { fetchedCategories } = this.state;
		return (
			<Layout>
				<Modal active={this.state.displayModal} message={this.state.success} error={this.state.modalError} />
				<div className='columns is-centered'>
					<div className='column is-half'>
						<h1 className='subtitle'>Create Product</h1>
						<form
							onSubmit={(e) => {
								this.handleSubmit(e);
							}}>
							<div className='field'>
								<label className='label'>Title</label>
								<input className='input' placeholder='Title' name='title' onChange={(e) => this.handleChange(e)} />
								{this.state.errors.title && <Error error={this.state.errors.title} />}
							</div>
							<div className='field'>
								<label className='label'>Item Number</label>
								<input
									className='input'
									placeholder='Item Number'
									name='itemNumber'
									onChange={(e) => this.handleChange(e)}
								/>
								{this.state.errors.itemNumber && <Error error={this.state.errors.itemNumber} />}
							</div>
							<div className='field'>
								<label className='label'>Brand</label>
								<input className='input' placeholder='Brand' name='brand' onChange={(e) => this.handleChange(e)} />
								{this.state.errors.brand && <Error error={this.state.errors.brand} />}
							</div>

							<div className='field'>
								<label className='label'>Price</label>
								<input className='input' placeholder='Price' name='price' onChange={(e) => this.handleChange(e)} />
								{this.state.errors.price && <Error error={this.state.errors.price} />}
							</div>

							<div className='field'>
								<label className='label'>Currency</label>
								<input
									className='input'
									placeholder='Currency'
									name='currency'
									onChange={(e) => this.handleChange(e)}
								/>
								{this.state.errors.currency && <Error error={this.state.errors.currency} />}
							</div>
							<div className='field'>
								<label className='label'>Material</label>
								<input
									className='input'
									placeholder='Material'
									name='material'
									onChange={(e) => this.handleChange(e)}
								/>
								{this.state.errors.material && <Error error={this.state.errors.material} />}
							</div>
							<div className='field'>
								<label className='label'>Weight</label>
								<input className='input' placeholder='Weight' name='weight' onChange={(e) => this.handleChange(e)} />
								{this.state.errors.weight && <Error error={this.state.errors.weight} />}
							</div>
							<div className='field'>
								<label className='label'>Description</label>
								<textarea
									className='textarea'
									placeholder='Description'
									name='description'
									onChange={(e) => this.handleChange(e)}
								/>
								{this.state.errors.description && <Error error={this.state.errors.description} />}
							</div>
							<div className='field'>
								<label className='label'>Select a category</label>
								<Dropdown listName='Select Category'>
									{fetchedCategories.map((category) => {
										const { id } = category;
										return (
											<a
												href='/'
												className={`dropdown-item ${id === this.state.category ? 'is-active' : ''}`}
												key={id}
												onClick={(e) => this.handleClick(e, category.id)}>
												{category.description}
											</a>
										);
									})}
								</Dropdown>
							</div>

							<div className='field'>
								<label className='label button is-primary'>
									Upload an image
									<input
										required
										className='button is-link'
										type='file'
										name='image'
										onChange={(e) => this.handleChange(e)}
									/>
								</label>
							</div>
							<br />
							<button className='button is-primary'>Create</button>
						</form>
						{this.state.loading && <Loader />}
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
		getAllProducts: () => {
			dispatch(getAllProducts());
		}
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewProduct));
