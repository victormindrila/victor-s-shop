import React from 'react';
import Layout from '../../components/Layout/Layout';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

//components
import Modal from '../../components/Modal/Modal';

//helpers
import axios from 'axios';

class ViewCategory extends React.Component {
	constructor() {
		super();
		this.state = {
			category: '',
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
					category: response.data,
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

	handleDelete(id) {
		const authToken = localStorage.getItem('Authorization');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.delete(`/admin/category/${id}`)
			.then((response) => {
				this.setState({
					displayModal: true,
					success: response.data.message
				});
				setTimeout(() => {
					this.setState({
						displayModal: false
					});
					this.props.history.push('/admin/categories');
				}, 1500);
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
	render() {
		const categoryId = this.props.match.params.categoryId;
		return (
			<Layout>
				<Modal error={this.state.modalError} message={this.state.success} active={this.state.displayModal} />
				<div className='container'>
					<div className='columns'>
						<div className='column is-two-thirds'>
							<div className='card'>
								<header className='card-header'>
									<p className='card-header-title'>Name: {this.state.category.name}</p>
								</header>
								<div className='card-content'>
									<p>
										<span> Description: </span> {this.state.category.description}
									</p>
									<p>
										<span> Created at: </span> {this.state.category.createdAt}
									</p>
								</div>
								<footer className='card-footer'>
									<Link to={`/admin/categories/edit/${categoryId}`}>
										<button className='button is-link'>Edit</button>
									</Link>
									<button className='button is-danger' onClick={(e) => this.handleDelete(categoryId)}>
										Delete
									</button>
								</footer>
							</div>
						</div>
						<div className='column is-one-third'>
							<div className='card'>
								<div className='card-image'>
									<figure className='image is4by3'>
										<img src={this.state.category.imageUrl} alt='product' />
									</figure>
								</div>
							</div>
						</div>
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

export default withRouter(connect(mapStateToProps)(ViewCategory));
