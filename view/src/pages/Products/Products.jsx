import React from 'react';
import Layout from '../../components/Layout/Layout';
import ProductsList from '../../components/ProductsList/ProductsList';
import { connect } from 'react-redux';

//actions
import { getAllProducts } from '../../store/actions/products';
import { getAllCategories } from '../../store/actions/categories';

class ProductList extends React.Component {
	componentDidMount() {
		const { products, categories, getAllProducts, getAllCategories } = this.props;
		if (products.data.length === 0) getAllProducts();
		if (!categories.data) getAllCategories();
	}

	render() {
		const { data: products } = this.props.products;
		const categoryId = this.props.history.location.search.split('?category=')[1];
		console.log(categoryId);
		const filteredProducts = products ? products.filter((product) => product.id === categoryId) : [];
		console.log(filteredProducts);

		return (
			<Layout>
				<div className='container-fluid container-min-max-width'>
					<h2>All Products</h2>
					<ProductsList products={products} />
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
