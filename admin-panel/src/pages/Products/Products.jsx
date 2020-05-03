import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//actions
import { getAllProducts } from '../../store/actions/products';
import { deleteProduct } from '../../store/actions/product';

// components
import Layout from '../../components/Layout/Layout';
import Loader from '../../components/Loader/Loader';
import Error from '../../components/Error/Error';

class Products extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidUpdate() {
		if (!this.props.user) this.props.history.push('/admin/signin');
	}
	componentDidMount() {
		const { getAllProducts } = this.props;
		if (!this.props.user) this.props.history.push('/admin/signin');
		if (!this.props.products.data) getAllProducts();
	}
	render() {
		const { products } = this.props;
		const { deleteProduct } = this.props;

		if (this.props.user.loading) {
			return <Loader />;
		} else {
			return (
				<Layout>
					<div className='control'>
						<h1 className='subtitle'>Products</h1>
						<Link to='/admin/products/new' className='button is-primary'>
							New Product
						</Link>
						{this.props.products.loading || this.props.product.loading ? <Loader /> : null}
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
												<button className='button is-link'>View</button>
											</td>
											<td>
												<button className='button is-link'>Edit</button>
											</td>
											<td>
												<button className='button is-danger' onClick={(e) => deleteProduct(product.id)}>
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
		products: state.products,
		product: state.product
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getAllProducts: () => {
			dispatch(getAllProducts());
		},
		deleteProduct: (id) => {
			dispatch(deleteProduct(id));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);
