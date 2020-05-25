import React from 'react';
import Layout from '../../components/Layout/Layout';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// components
import Error from '../../components/Error/Error';
import Loader from '../../components/Loader/Loader';
import Modal from '../../components/Modal/Modal';

// helpers
import { validateNewCategoryData } from '../../utils/validators';
import axios from 'axios';

class NewCategory extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			description: '',
			image: '',
			loading: false,
			displayModal: false,
			modalError: '',
			errors: '',
			success: ''
		};
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.name === 'image' ? e.target.files[0] : e.target.value
		});
	}
	handleSubmit(e) {
		e.preventDefault();
		const categoryData = {
			description: this.state.description,
			name: this.state.name
		};
		const { image } = this.state;

		const { valid, errors } = validateNewCategoryData(categoryData);

		if (!valid) this.setState({ errors: errors });
		if (valid) {
			this.setState({
				loading: true
			});
			const authToken = localStorage.getItem('Authorization');
			axios.defaults.headers.common = { Authorization: `${authToken}` };
			let createCategoryResponse;
			axios
				.post('http://localhost:5000/aligo-test/us-central1/api/admin/category', categoryData)
				.then((response) => {
					createCategoryResponse = response.data.message;
					const formData = new FormData();
					formData.append('categoryId', response.data.category.id);
					formData.append('image', image);
					return axios.post('http://localhost:5000/aligo-test/us-central1/api/admin/category/image', formData, {
						headers: {
							'content-type': 'multipart/form-data'
						}
					});
				})
				.then((response) => {
					this.setState({
						loading: false,
						displayModal: true,
						success: createCategoryResponse
					});
					setTimeout(() => {
						this.props.history.push('/admin/categories/');
					}, 1500);
				})
				.catch((error) => {
					console.dir(error);
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
		return (
			<Layout>
				<Modal active={this.state.displayModal} message={this.state.success} error={this.state.modalError} />

				<div className='columns is-centered'>
					<div className='column is-half'>
						<h1 className='subtitle'>Create Category</h1>
						<form
							onSubmit={(e) => {
								this.handleSubmit(e);
							}}>
							<div className='field'>
								<label className='label'>Category name</label>
								<input
									className='input'
									placeholder='name'
									name='name'
									value={this.state.name}
									onChange={(e) => this.handleChange(e)}
								/>
								{this.state.errors.name && <Error error={this.state.errors.name} />}
							</div>
							<div className='field'>
								<label className='label'>Description</label>
								<textarea
									className='textarea'
									placeholder='description'
									name='description'
									value={this.state.description}
									onChange={(e) => this.handleChange(e)}
								/>
								{this.state.errors.description && <Error error={this.state.errors.description} />}
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
		userData: state.user.data
	};
}

export default withRouter(connect(mapStateToProps)(NewCategory));
