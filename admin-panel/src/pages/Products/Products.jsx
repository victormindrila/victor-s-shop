import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//actions
import { getAllProducts } from '../../store/actions/products';

// components
import Layout from '../../components/Layout/Layout';
import Loader from '../../components/Loader/Loader';
import Error from '../../components/Error/Error';
import Modal from '../../components/Modal/Modal';

//helpers
import axios from 'axios';

class Products extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			displayModal: false,
			modalError: '',
			success: ''
		};
	}

	componentDidUpdate() {
		if (!this.props.user) this.props.history.push('/admin/signin');
	}
	componentDidMount() {
		if (!this.props.user) this.props.history.push('/admin/signin');
		if (!this.props.products.data) this.props.getAllProducts();
	}

	handleDelete(id) {
		const authToken = localStorage.getItem('Authorization');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.delete(`http://localhost:5000/aligo-test/us-central1/api/admin/product/${id}`)
			.then((response) => {
				this.setState({
					displayModal: true,
					success: response.data.message
				});
				setTimeout(() => {
					this.setState({
						displayModal: false
					});
					this.props.getAllProducts();
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
					this.props.getAllProducts();
				}, 1500);
			});
	}

	render() {
		const { products } = this.props;

		if (this.props.user.loading) {
			return <Loader />;
		} else {
			return (
				<Layout>
					<Modal error={this.state.modalError} message={this.state.success} active={this.state.displayModal} />
					<div className='control'>
						<h1 className='subtitle'>Products</h1>
						<Link to='/admin/products/new' className='button is-primary'>
							New Product
						</Link>
						{this.props.products.loading ? <Loader /> : null}
					</div>
					{products.data ? (
						<table className='table'>
							<thead>
								<tr>
									<th>Title</th>
									<th>Price</th>
									<th>Category</th>
									<th>View</th>
									<th>Edit Product</th>
									<th>Delete Product</th>
									<th>Add/Remove from Featured</th>
								</tr>
							</thead>
							<tbody>
								{products.data.map((product) => {
									return (
										<tr key={product.id}>
											<td>{product.description}</td>
											<td>{product.price}</td>
											<td>Category name</td>
											<td>
												<Link to={`/admin/products/view/${product.id}`}>
													<button className='button is-link'>View</button>
												</Link>
											</td>
											<td>
												<Link to={`/admin/products/edit/${product.id}`}>
													<button className='button is-link'>Edit</button>
												</Link>
											</td>
											<td>
												<button className='button is-danger' onClick={(e) => this.handleDelete(product.id)}>
													Delete
												</button>
											</td>
											<td>
												<button className='button is-link'>Add</button>
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

function mapDispatchToProps(dispatch) {
	return {
		getAllProducts: () => {
			dispatch(getAllProducts());
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);
