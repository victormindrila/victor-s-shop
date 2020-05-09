import React from 'react';
import Layout from '../../components/Layout/Layout';
import { connect } from 'react-redux';

// components
import Error from '../../components/Error/Error';
import Loader from '../../components/Loader/Loader';
import Modal from '../../components/Modal/Modal';

// helpers
import { validateNewCategoryData } from '../../utils/validators';
import axios from 'axios';

class EditCategory extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			description: '',
			image: '',
			loading: true,
			displayModal: false,
			modalError: '',
			errors: '',
			success: ''
		};
	}
	componentDidMount() {
		this.fetchCategory();
	}

	fetchCategory() {
		const categoryId = this.props.match.params.categoryId;
		const authToken = localStorage.getItem('Authorization');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.get('/admin/category/', {
				params: { categoryId }
			})
			.then((response) => {
				this.setState({
					description: response.data.description,
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
		this.setState({
			loading: true
		});
		const categoryId = this.props.match.params.categoryId;
		const categoryData = {
			description: this.state.description
		};

		const { valid, errors } = validateNewCategoryData(categoryData);

		if (!valid) this.setState({ errors: errors });
		if (valid) {
			this.setState({
				loading: true
			});
			const authToken = localStorage.getItem('Authorization');
			axios.defaults.headers.common = { Authorization: `${authToken}` };
			axios
				.put(`/admin/category/${categoryId}`, categoryData)
				.then((response) => {
					this.setState({
						loading: false,
						displayModal: true,
						success: response.data.message
					});
					if (this.state.image) {
						const formData = new FormData();
						formData.append('categoryId', categoryId);
						formData.append('image', this.state.image);
						return axios.post('/admin/category/image', formData, {
							headers: {
								'content-type': 'multipart/form-data'
							}
						});
					}
				})
				.then(() => {
					setTimeout(() => {
						this.props.history.push('/admin/categories');
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
						<h1 className='subtitle'>Edit Category</h1>
						<form
							onSubmit={(e) => {
								this.handleSubmit(e);
							}}>
							<div className='field'>
								<label className='label'>Category name</label>
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
								<label className='label button is-primary'>
									Update image
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
		userData: state.user.data
	};
}

export default connect(mapStateToProps)(EditCategory);