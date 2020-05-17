import React from 'react';
import Layout from '../../components/Layout/Layout';
import ProductsList from '../../components/ProductsList/ProductsList';
import { connect } from 'react-redux';

//actions
import { getAllProducts } from '../../store/actions/products';
import { getAllCategories } from '../../store/actions/categories';
import { Link } from 'react-router-dom';

class ProductList extends React.Component {
	componentDidMount() {
		const { products, categories, getAllProducts, getAllCategories } = this.props;
		if (products.data.length === 0) getAllProducts();
		if (categories.data.length === 0) getAllCategories();
	}

	render() {
		const { data: products } = this.props.products;
		const { data: categories } = this.props.categories;
		const categoryId = this.props.history.location.search.split('?category=')[1];
		const category = categories.find((category) => category.id === categoryId);
		console.log(category);
		const filteredProducts = products.filter((product) => product.category.id === categoryId);

		return (
			<Layout>
				<div className='container-fluid container-min-max-width'>
					<Link to='/'>
						<button className='btn btn-outline-dark my-3'>Back</button>
					</Link>
					<hr />
					<h2>{category ? category.name : 'All Products'}</h2>
					<hr />
					<ProductsList products={categoryId ? filteredProducts : products} />
				</div>
			</Layout>
		);
	}
}

function mapStateToProps(state) {
	return {
		products: state.products,
		categories: state.categories
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getAllProducts: () => {
			dispatch(getAllProducts());
		},
		getAllCategories: () => {
			dispatch(getAllCategories());
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
