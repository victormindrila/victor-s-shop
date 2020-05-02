import React from 'react';
import Layout from '../../components/Layout/Layout';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Products extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidUpdate() {
		if (!this.props.user) this.props.history.push('/admin/signin');
	}
	componentDidMount() {
		if (!this.props.user) this.props.history.push('/admin/signin');
	}
	render() {
		console.log(this.props);
		return (
			<Layout>
				<div className='control'>
					<h1 className='subtitle'>Products</h1>
					<Link to='/admin/products/new' className='button is-primary'>
						New Product
					</Link>
				</div>
				<table className='table'>
					<thead>
						<tr>
							<th>Title</th>
							<th>Price</th>
							<th>Category</th>
							<th>Subcategory</th>
							<th>View</th>
							<th>Edit Product</th>
							<th>Delete Product</th>
							<th>Add/Remove from Featured</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Product 1</td>
							<td>Price</td>
							<td>Category Name</td>
							<td>Subcategory name</td>
							<td>
								<Link href='/'>
									<button className='button is-link'>View</button>
								</Link>
							</td>
							<td>
								<Link href='/'>
									<button className='button is-link'>Edit</button>
								</Link>
							</td>
							<td>
								<form method='POST' action='/'>
									<button className='button is-danger'>Delete</button>
								</form>
							</td>
							<td>
								<form method='POST' action='/'>
									<button className='button is-link'>Add</button>
								</form>
							</td>
						</tr>
					</tbody>
				</table>
			</Layout>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.user.data
	};
}

function mapDispatchToProps(dispatch) {}

export default connect(mapStateToProps, mapDispatchToProps)(Products);
