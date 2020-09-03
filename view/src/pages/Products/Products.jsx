import React from 'react';
import Layout from '../../components/Layout/Layout';
import { connect } from 'react-redux';

//components
import BackButton from '../../components/BackButton/BackButton';
import DropdownSort from '../../components/Dropdown/DropdownSort';
import FiltersSideBar from '../../components/FiltersSideBar/FiltersSideBar';
import WithSpinner from '../../components/WithSpinner/WithSpinner';
import ProductsList from '../../components/ProductsList/ProductsList';

//actions
import { getAllProducts } from '../../store/actions/products';
import { getAllCategories } from '../../store/actions/categories';

//selectors
import {
	selectProductsData,
	selectSortedProducts,
	selectFilteredProducts,
	selectURLSearchParams,
	selectProductsLoading,
	selectFilterOptions
} from '../../store/selectors/products';
import { selectCategoriesData, selectCategoryName } from '../../store/selectors/categories';
import { selectUserData } from '../../store/selectors/user';

// CSS
import './Products.css';

const ProductsListWithSpinner = WithSpinner(ProductsList);

class Products extends React.Component {
	componentDidMount() {
		window.scrollTo(0, 0);

		const { products, categories, getAllProducts, getAllCategories } = this.props;
		if (products.length === 0) getAllProducts();
		if (categories.length === 0) getAllCategories();
	}

	render() {
		const { history, visibleProducts, categoryName, params, productsLoading, filterOptions } = this.props;
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
						<FiltersSideBar params={params} history={history} filterOptions={filterOptions} />
						<ProductsListWithSpinner isLoading={productsLoading} products={visibleProducts} />
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
	productsLoading: selectProductsLoading(state),
	filterOptions: selectFilterOptions(state),
	categoryName: selectCategoryName(state, ownProps)
});

const mapDispatchToProps = (dispatch) => ({
	getAllProducts: () => {
		dispatch(getAllProducts());
	},
	getAllCategories: () => {
		dispatch(getAllCategories());
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
