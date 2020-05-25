import React from 'react';
import Layout from '../../components/Layout/Layout';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//components
import Modal from '../../components/Modal/Modal';

// assets
import User from '../../assets/images/User.png';

//helpers
import axios from 'axios';

class ViewCategory extends React.Component {
	constructor() {
		super();
		this.state = {
			user: '',
			loading: true,
			displayModal: false,
			modalError: '',
			errors: '',
			success: ''
		};
	}

	componentDidMount() {
		this.fetchUser();
	}

	fetchUser() {
		const userEmail = this.props.match.params.userEmail;
		const authToken = localStorage.getItem('Authorization');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.get('/admin/users/view', {
				params: { userEmail }
			})
			.then((response) => {
				this.setState({
					user: response.data,
					loading: false
				});
			})
			.catch((error) => {
				this.setState({
					displayModal: true,
					modalError: error.response.data
				});
				setTimeout(() => {
					this.setState({
						displayModal: false,
						modalError: ''
					});
				}, 3000);
			});
	}

	handleDelete(id) {
		const authToken = localStorage.getItem('Authorization');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.delete(`/admin/user/${this.state.user.email}`)
			.then((response) => {
				this.setState({
					displayModal: true,
					success: response.data.message
				});
				setTimeout(() => {
					this.setState({
						displayModal: false
					});
					this.props.history.push('/admin/users');
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
		const userId = this.props.match.params.userId;
		const { user } = this.state;
		return (
			<Layout>
				<Modal error={this.state.modalError} message={this.state.success} active={this.state.displayModal} />
				<div className='container'>
					<div className='columns'>
						<div className='column is-two-thirds'>
							<div className='card'>
								<header className='card-header'>
									<p className='card-header-title'>
										{user.firstName} {user.lastName}{' '}
									</p>
								</header>
								<div className='card-content'>
									<p>
										<span> First Name: </span> {user.firstName}
									</p>
									<p>
										<span> Last Name: </span> {user.lastName}
									</p>
									<p>
										<span> E-mail: </span> {user.email}
									</p>
									<p>
										<span> Phone: </span> {user.phoneNumber}
									</p>
									<p>
										<span> Country: </span> {user.country}
									</p>
									<p>
										<span> Created at: </span> {user.createdAt}
									</p>
									<p>
										<span> User ID: </span> {userId}
									</p>
								</div>

								<footer className='card-footer'>
									<button className='button is-danger' onClick={(e) => this.handleDelete(userId)}>
										Delete
									</button>
								</footer>
							</div>
						</div>
						<div className='column is-one-third'>
							<div className='card'>
								<div className='card-image'>
									<figure className='image is128by128'>
										<img src={user.imageUrl || User} alt='product' />
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
