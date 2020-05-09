import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// components
import Layout from '../../components/Layout/Layout';
import Loader from '../../components/Loader/Loader';
import Error from '../../components/Error/Error';
import Modal from '../../components/Modal/Modal';

//helpers
import axios from 'axios';

class Categories extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: [],
			loading: true,
			displayModal: false,
			modalError: '',
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
					categories: response.data,
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
					this.fetchCategories();
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
		const { categories } = this.state;

		if (this.props.user.loading) {
			return <Loader />;
		} else {
			return (
				<Layout>
					<Modal error={this.state.modalError} message={this.state.success} active={this.state.displayModal} />
					<div className='control'>
						<h1 className='subtitle'>Categories</h1>
						<Link to='/admin/categories/new' className='button is-primary'>
							New Category
						</Link>
						{this.state.loading ? <Loader /> : null}
					</div>
					{categories ? (
						<table className='table'>
							<thead>
								<tr>
									<th>Title</th>
									<th>View</th>
									<th>Edit </th>
									<th>Delete </th>
								</tr>
							</thead>
							<tbody>
								{categories.map((category) => {
									return (
										<tr key={category.id}>
											<td>{category.description}</td>
											<td>
												<Link to={`/admin/categories/view/${category.id}`}>
													<button className='button is-link'>View</button>
												</Link>
											</td>
											<td>
												<Link to={`/admin/categories/edit/${category.id}`}>
													<button className='button is-link'>Edit</button>
												</Link>
											</td>
											<td>
												<button className='button is-danger' onClick={(e) => this.handleDelete(category.id)}>
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
		user: state.user.data
	};
}

export default connect(mapStateToProps)(Categories);
