import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// components
import Layout from '../../components/Layout/Layout';
import Loader from '../../components/Loader/Loader';
import Error from '../../components/Error/Error';
import Modal from '../../components/Modal/Modal';

//helpers
import axios from 'axios';

class Users extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			loading: true,
			displayModal: false,
			modalError: '',
			success: ''
		};
	}
	componentDidMount() {
		this.fetchUsers();
	}

	fetchUsers() {
		const authToken = localStorage.getItem('Authorization');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.get('/admin/users')
			.then((response) => {
				this.setState({
					users: response.data,
					loading: false
				});
			})
			.catch((error) => {
				this.setState({
					displayModal: true,
					modalError: error.response.data.message
				});
				setTimeout(() => {
					this.setState({
						displayModal: false,
						modalError: ''
					});
				}, 1500);
			});
	}

	handleDelete(email) {
		const authToken = localStorage.getItem('Authorization');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.delete(`/admin/user/${email}`)
			.then((response) => {
				this.setState({
					displayModal: true,
					success: response.data.message
				});
				setTimeout(() => {
					this.setState({
						displayModal: false
					});
					this.fetchUsers();
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
				}, 3000);
			});
	}

	render() {
		const { users } = this.state;

		if (this.props.user.loading) {
			return <Loader />;
		} else {
			return (
				<Layout>
					<Modal error={this.state.modalError} message={this.state.success} active={this.state.displayModal} />
					<div className='control'>
						<h1 className='subtitle'>Users</h1>
						{this.state.loading ? <Loader /> : null}
					</div>
					{users ? (
						<table className='table'>
							<thead>
								<tr>
									<th>First Name</th>
									<th>Last Name</th>
									<th>E-mail</th>
									<th>View User</th>
									<th>Delete User</th>
								</tr>
							</thead>
							<tbody>
								{users.map((user) => {
									return (
										<tr key={user.uid}>
											<td>{user.firstName}</td>
											<td>{user.lastName}</td>
											<td>{user.email}</td>
											<td>
												<Link to={`/admin/users/view/${user.email}`}>
													<button className='button is-link'>View</button>
												</Link>
											</td>
											<td>
												<button className='button is-danger' onClick={(e) => this.handleDelete(user.email)}>
													Delete
												</button>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					) : (
						<Error />
					)}
				</Layout>
			);
		}
	}
}

function mapStateToProps(state) {
	return {
		user: state.user.data,
		products: state.products
	};
}

export default withRouter(connect(mapStateToProps)(Users));
