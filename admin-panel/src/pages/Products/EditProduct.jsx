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
		this.fetchProductData();
	}

	fetchProductData() {
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
					title: response.data.title,
					itemNumber: response.data.itemNumber,
					brand: response.data.brand,
					price: response.data.price,
					currency: response.data.currency,
					material: response.data.material,
					weight: response.data.weight,
					description: response.data.description,
					image: response.data.image
				});
			})
			.catch((error) => {
				this.setState({
					errors: error
				});
			});
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

	handleSubmit(e) {
		e.preventDefault();
		const productId = this.props.match.params.productId;
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

		const { valid, errors } = validateNewProductData(productData);

		if (!valid) this.setState({ errors: errors });

		if (valid) {
			this.setState({
				loading: true
			});
			const authToken = localStorage.getItem('Authorization');
			axios.defaults.headers.common = { Authorization: `${authToken}` };
			axios
				.put(`/admin/product/${productId}`, productData)
				.then((response) => {
					this.setState({
						loading: false,
						displayModal: true,
						success: response.data.message
					});
					setTimeout(() => {
						this.props.getAllProducts();
						this.props.history.goBack();
					}, 1500);
				})
				.then(() => {
					if (this.state.image) {
						const formData = new FormData();
						formData.append('productId', productId);
						formData.append('image', this.state.image);
						return axios.post('/admin/product/image', formData, {
							headers: {
								'content-type': 'multipart/form-data'
							}
						});
					}
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
	handleClick(e, id) {
		e.preventDefault();
		this.setState({
			category: id
		});
	}
	render() {
		const { fetchedCategories } = this.state;
		return (
			<Layout>
				<Modal active={this.state.displayModal} message={this.state.success} error={this.state.modalError} />
				<div className='columns is-centered'>
					<div className='column is-half'>
						<h1 className='subtitle'>Update product</h1>
						{this.state.error && <Error error={'Could not create product!'} />}
						<Dropdown listName='Select Category'>
							{fetchedCategories.map((category) => {
								const { id } = category;
								return (
									<a
										href='/'
										className={`dropdown-item ${id === this.state.category ? 'is-active' : ''}`}
										key={id}
										onClick={(e) => this.handleClick(e, category.id)}>
										{category.name}
									</a>
								);
							})}
						</Dropdown>
						{this.state.errors.category && <Error error={this.state.errors.category} />}
						<form
							onSubmit={(e) => {
								this.handleSubmit(e);
							}}>
							<div className='field'>
								<label className='label'>Title</label>
								<input
									className='input'
									placeholder='Title'
									name='title'
									onChange={(e) => this.handleChange(e)}
									value={this.state.title}
								/>
								{this.state.errors.title && <Error error={this.state.errors.title} />}
							</div>
							<div className='field'>
								<label className='label'>Item Number</label>
								<input
									className='input'
									placeholder='Item Number'
									name='itemNumber'
									value={this.state.itemNumber}
									onChange={(e) => this.handleChange(e)}
								/>
								{this.state.errors.itemNumber && <Error error={this.state.errors.itemNumber} />}
							</div>
							<div className='field'>
								<label className='label'>Brand</label>
								<input
									className='input'
									placeholder='Brand'
									name='brand'
									value={this.state.brand}
									onChange={(e) => this.handleChange(e)}
								/>
								{this.state.errors.brand && <Error error={this.state.errors.brand} />}
							</div>

							<div className='field'>
								<label className='label'>Price</label>
								<input
									className='input'
									placeholder='Price'
									name='price'
									value={this.state.price}
									onChange={(e) => this.handleChange(e)}
								/>
								{this.state.errors.price && <Error error={this.state.errors.price} />}
							</div>

							<div className='field'>
								<label className='label'>Currency</label>
								<input
									className='input'
									placeholder='Currency'
									name='currency'
									value={this.state.currency}
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
									value={this.state.material}
									onChange={(e) => this.handleChange(e)}
								/>
								{this.state.errors.material && <Error error={this.state.errors.material} />}
							</div>
							<div className='field'>
								<label className='label'>Weight</label>
								<input
									className='input'
									placeholder='Weight'
									name='weight'
									value={this.state.weight}
									onChange={(e) => this.handleChange(e)}
								/>
								{this.state.errors.weight && <Error error={this.state.errors.weight} />}
							</div>
							<div className='field'>
								<label className='label'>Description</label>
								<textarea
									className='textarea'
									placeholder='Description'
									name='description'
									value={this.state.description}
									onChange={(e) => this.handleChange(e)}
								/>
								{this.state.errors.description && <Error error={this.state.errors.description} />}
							</div>
							<div className='field'>
								<label className='label'>Select a category</label>
							</div>

							<div className='field'>
								<label className='label button is-primary'>
									Upload an image
									<input className='button is-link' type='file' name='image' onChange={(e) => this.handleChange(e)} />
								</label>
							</div>
							<br />
							<button className='button is-primary'>Update</button>
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
