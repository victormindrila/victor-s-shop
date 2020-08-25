import React from 'react';
import Layout from '../../components/Layout/Layout';
import ProductsList from '../../components/ProductsList/ProductsList';
import { connect } from 'react-redux';

//components
import BackButton from '../../components/BackButton/BackButton';
import DropdownSort from '../../components/Dropdown/DropdownSort';
import FiltersSideBar from '../../components/FiltersSideBar/FiltersSideBar';
import Loader from '../../components/Loader/Loader';

//actions
import { getAllProducts } from '../../store/actions/products';
import { getAllCategories } from '../../store/actions/categories';
import {
	selectProductsData,
	selectSortedProducts,
	selectFilteredProducts,
	selectURLSearchParams,
	selectProductsLoading
} from '../../store/selectors/products';
import { selectCategoriesData } from '../../store/selectors/categories';
import { selectUserData } from '../../store/selectors/user';

// CSS
import './Products.css';

class ProductList extends React.Component {
	constructor() {
		super();
		this.state = {
			categoryName: ''
		};
	}
	componentDidMount() {
		window.scrollTo(0, 0);

		const { products, categories, getAllProducts, getAllCategories } = this.props;
		const params = new URLSearchParams(this.props.history.location.search);
		const categoryId = params.get('category');
		if (products.length === 0) getAllProducts();
		if (categories.length === 0) getAllCategories();
		const categoryName = this.getCategoryName(categoryId);
		this.setState({
			categoryName: categoryName
		});
	}

	getCategoryName(categoryId) {
		const { categories } = this.props;
		const category = categories.find((category) => category.id === categoryId);
		let categoryName;

		if (categoryId === null) {
			categoryName = 'All Products';
		} else if (categoryId === 'favorites') {
			categoryName = 'Favorites';
		} else {
			categoryName = category && category.name;
		}
		return categoryName;
	}

	render() {
		const { history, visibleProducts, filteredProducts, params, productsLoading } = this.props;
		const { categoryName } = this.state;

		return (
			<Layout>
				<div className='container-fluid container-min-max-width'>
					<div className='d-flex justify-content-between'>
						<BackButton goBack={history.goBack} />
						<DropdownSort params={params} history={history} />
					</div>

					<hr />
					<h2>{categoryName}</h2>
					<hr />
					<div className='d-flex products-container'>
						<FiltersSideBar params={params} history={history} products={filteredProducts} />
						{productsLoading ? <Loader /> : <ProductsList products={visibleProducts} />}
					</div>
				</div>
			</Layout>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	products: selectProductsData(state),
	categories: selectCategoriesData(state),
	user: selectUserData(state),
	params: selectURLSearchParams(state, ownProps),
	filteredProducts: selectFilteredProducts(state, ownProps),
	visibleProducts: selectSortedProducts(state, ownProps),
	productsLoading: selectProductsLoading(state)
});

const mapDispatchToProps = (dispatch) => ({
	getAllProducts: () => {
		dispatch(getAllProducts());
	},
	getAllCategories: () => {
		dispatch(getAllCategories());
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
