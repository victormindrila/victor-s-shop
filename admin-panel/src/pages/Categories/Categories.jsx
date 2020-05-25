import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// components
import Layout from '../../components/Layout/Layout';
import Loader from '../../components/Loader/Loader';
import Modal from '../../components/Modal/Modal';
import Pagination from '../../components/Pagination/Pagination';

//helpers
import axios from 'axios';
import { chunkArray } from '../../utils/helpers';
import {
	NUMBER_OF_PRODUCTS_ON_PAGE,
	PAGINATION_STYLE,
	PAGINATION_SIZE,
	NUMBER_OF_PAGINATION_ELEMENTS,
	PAGINATION_ALIGNMENT
} from '../../constants/pagination';

class Categories extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: [],
			loading: true,
			displayModal: false,
			modalError: '',
			success: '',
			pageNumber: 1
		};
	}

	componentWillReceiveProps(props) {
		const pageNumber = this.props.history.location.search.split('?page=')[1] || 1;
		this.setState({
			pageNumber: pageNumber
		});
	}

	componentDidMount() {
		this.fetchCategories();
		const pageNumber = this.props.history.location.search.split('?page=')[1] || 1;
		this.setState({
			pageNumber: pageNumber
		});
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

	pageLink(no) {
		if (no === 1) return '/admin/categories/';

		return `/admin/categories/?page=${no}`;
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
		const { categories, pageNumber, loading, modalError, success, displayModal } = this.state;

		const displayedCategories = chunkArray(categories, NUMBER_OF_PRODUCTS_ON_PAGE);

		const numberOfPages = Math.ceil(categories.length / NUMBER_OF_PRODUCTS_ON_PAGE);

		if (this.props.user.loading) {
			return <Loader />;
		} else {
			return (
				<Layout>
					<Modal error={modalError} message={success} active={displayModal} />
					<div className='control'>
						<h1 className='subtitle'>Categories</h1>
						<Link to='/admin/categories/new' className='button is-primary'>
							New Category
						</Link>
						{loading ? <Loader /> : null}
					</div>
					{displayedCategories[pageNumber - 1] && (
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
								{displayedCategories[pageNumber - 1].map((category) => {
									return (
										<tr key={category.id}>
											<td>{category.name}</td>
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
					)}

					<Pagination
						total={numberOfPages}
						active={pageNumber}
						size={PAGINATION_SIZE}
						style={PAGINATION_STYLE}
						alignment={PAGINATION_ALIGNMENT}
						show={NUMBER_OF_PAGINATION_ELEMENTS}
						pageLink={this.pageLink}
					/>
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

export default withRouter(connect(mapStateToProps)(Categories));
