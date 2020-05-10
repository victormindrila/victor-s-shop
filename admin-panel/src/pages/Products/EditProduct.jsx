import React from 'react';
import Layout from '../../components/Layout/Layout';
import { connect } from 'react-redux';

//actions
import { getAllProducts } from '../../store/actions/products';

// components
import Error from '../../components/Error/Error';
import Loader from '../../components/Loader/Loader';
import Modal from '../../components/Modal/Modal';

// helpers
import { validateNewProductData } from '../../utils/validators';
import axios from 'axios';

class NewProduct extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			description: '',
			price: '',
			image: '',
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
					description: response.data.description,
					price: response.data.price,
					image: response.data.image,
					loading: false
				});
			})
			.catch((error) => {
				this.setState({
					errors: error
				});
			});
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.name === 'image' ? e.target.files[0] : e.target.value
		});
	}
	handleSubmit(e) {
		e.preventDefault();
		this.setState({
			loading: true
		});
		const productId = this.props.match.params.productId;
		const productData = { description: this.state.description, price: this.state.price };
		const authToken = localStorage.getItem('Authorization');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.put(`http://localhost:5000/aligo-test/us-central1/api/admin/product/${productId}`, productData)
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
					return axios.post('http://localhost:5000/aligo-test/us-central1/api/admin/product/image', formData, {
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

	render() {
		return (
			<Layout>
				<Modal active={this.state.displayModal} message={this.state.success} error={this.state.modalError} />
				<div className='columns is-centered'>
					<div className='column is-half'>
						<h1 className='subtitle'>Update product</h1>
						{this.state.error && <Error error={'Could not create product!'} />}

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
									value={this.state.description}
									onChange={(e) => this.handleChange(e)}
								/>
								{this.state.errors.description && <Error error={this.state.errors.description} />}
							</div>

							<div className='field'>
								<label className='label'>Price</label>
								<input
									className='input'
									placeholder='price'
									name='price'
									value={this.state.price}
									onChange={(e) => this.handleChange(e)}
								/>
								{this.state.errors.price && <Error error={this.state.errors.price} />}
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

export default connect(mapStateToProps, mapDispatchToProps)(NewProduct);

// todo
// add category filed
// add new field button

// <div>
// <button className='button is-primary' id='add-feature'>
// 	<i className='fas fa-plus-circle' />{' '}
// </button>
// </div>
// <div className='select'>
// <label className='label'>Category</label>
// <select id='category' name='categoryId' />
// </div>
