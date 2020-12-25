import React from 'react';
import Layout from '../../components/Layout/Layout';
import { connect } from 'react-redux';

//components
import BackButton from '../../components/BackButton/BackButton';
import DropdownSort from '../../components/Dropdown/DropdownSort';
import FiltersSideBar from '../../components/FiltersSideBar/FiltersSideBar';
import WithSpinner from '../../components/HOCs/WithSpinner';
import ProductsList from '../../components/ProductsList/ProductsList';
import CartIsEmpty from '../../components/CartIsEmpty/CartIsEmpty';

//actions
import { getAllProductsIfNecessary } from '../../store/actions/products';
import { getAllCategoriesIfNecessary } from '../../store/actions/categories';

//selectors
import {
	selectSortedProducts,
	selectURLSearchParams,
	selectProductsLoading,
	selectFilterOptions
} from '../../store/selectors/products';
import { selectCategoryName } from '../../store/selectors/categories';

// CSS
import './Products.css';

//helpers
import { isEmptyArray } from '../../utils/misc';

const ProductsListWithSpinner = WithSpinner(({ history, params, categoryName, filterOptions, products }) => (
	<React.Fragment>
		<div className='d-flex justify-content-between'>
			<BackButton goBack={history.goBack} />
			<DropdownSort params={params} history={history} />
		</div>

		<hr />
		<h2>{categoryName}</h2>
		<hr />
		<div className='d-flex products-container'>
			<FiltersSideBar params={params} history={history} filterOptions={filterOptions} />
			<ProductsList products={products} />
		</div>
	</React.Fragment>
));

class Products extends React.Component {
	componentDidMount() {
		window.scrollTo(0, 0);
		this.props.getAllProductsIfNecessary();
		this.props.getAllCategoriesIfNecessary();
	}

	renderEmptyList() {
		return (
			<div className='w-100 vh-100 d-flex align-items-center justify-content-center flex-direction-column'>
				<CartIsEmpty />
			</div>
		);
	}

	render() {
		const { history, visibleProducts, categoryName, params, productsLoading, filterOptions } = this.props;
		return (
			<Layout title='Products'>
				<div className='container-fluid container-min-max-width'>
					{isEmptyArray(visibleProducts) && !productsLoading ? (
						this.renderEmptyList()
					) : (
						<ProductsListWithSpinner
							isLoading={productsLoading}
							history={history}
							products={visibleProducts}
							categoryName={categoryName}
							params={params}
							filterOptions={filterOptions}
						/>
					)}
				</div>
			</Layout>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	params: selectURLSearchParams(state, ownProps),
	visibleProducts: selectSortedProducts(state, ownProps),
	productsLoading: selectProductsLoading(state),
	filterOptions: selectFilterOptions(state),
	categoryName: selectCategoryName(state, ownProps)
});

const mapDispatchToProps = (dispatch) => ({
	getAllProductsIfNecessary: (state) => {
		dispatch(getAllProductsIfNecessary(state));
	},
	getAllCategoriesIfNecessary: (state) => {
		dispatch(getAllCategoriesIfNecessary(state));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
