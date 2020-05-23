import React from 'react';
import Layout from '../../components/Layout/Layout';
import ProductsList from '../../components/ProductsList/ProductsList';
import { connect } from 'react-redux';

//components
import BackButton from '../../components/BackButton/BackButton';
import DropdownSort from '../../components/Dropdown/DropdownSort';
import FiltersSideBar from '../../components/FiltersSideBar/FiltersSideBar';

//actions
import { getAllProducts } from '../../store/actions/products';
import { getAllCategories } from '../../store/actions/categories';

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

	filterProducts(products, filterBy) {
		const { favorites } = this.props;
		let filteredProducts = products.slice();
		if (!filterBy) return filteredProducts;

		if (filterBy.category) {
			if (filterBy.category === 'favorites') {
				filteredProducts = products.filter((product) => favorites.some((element) => element === product.id));
			} else {
				filteredProducts = products.filter((product) => product.category.id === filterBy.category);
			}
		}

		for (let item of [ ...Object.keys(filterBy) ]) {
			if (item !== 'category') {
				if (item === 'minPriceInput') {
					filteredProducts = filteredProducts.filter((product) => Number(product.price) >= Number(filterBy[item]));
				} else if (item === 'maxPriceInput') {
					filteredProducts = filteredProducts.filter((product) => Number(product.price) <= Number(filterBy[item]));
				} else {
					filteredProducts = filteredProducts.filter((product) => product[item] === filterBy[item]);
				}
			}
		}

		return filteredProducts;
	}

	sortProducts(products, sortBy) {
		const arrCpy = products.slice();
		if (sortBy === 'ascending') {
			arrCpy.sort((a, b) => {
				if (Number(a.price) < Number(b.price)) {
					return -1;
				}
				if (Number(a.price) > Number(b.price)) {
					return 1;
				}
				return 0;
			});
		} else if (sortBy === 'descending') {
			arrCpy.sort((a, b) => {
				if (Number(a.price) > Number(b.price)) {
					return -1;
				}
				if (Number(a.price) < Number(b.price)) {
					return 1;
				}
				return 0;
			});
		} else if (sortBy === 'default') {
			return products;
		}
		return arrCpy;
	}

	getFilters(params) {
		let filterBy;
		for (let pair of params.entries()) {
			if (pair[0] !== 'sort') {
				filterBy = {
					...filterBy,
					[pair[0]]: pair[1]
				};
			}
		}
		if (filterBy) return filterBy;
	}

	getSort(params) {
		let sortBy;
		for (let pair of params.entries()) {
			if (pair[0] === 'sort') {
				sortBy = pair[1];
			}
		}
		return sortBy;
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
		const params = new URLSearchParams(this.props.history.location.search);
		const { products } = this.props;

		const filterBy = this.getFilters(params);
		let sortBy = this.getSort(params);

		const filteredProducts = this.filterProducts(products, filterBy);
		const sortedProducts = this.sortProducts(filteredProducts, sortBy);

		return (
			<Layout>
				<div className='container-fluid container-min-max-width'>
					<div className='d-flex justify-content-between'>
						<BackButton goBack={this.props.history.goBack} />
						<DropdownSort params={params} history={this.props.history} />
					</div>

					<hr />
					<h2>{this.state.categoryName}</h2>
					<hr />
					<div className='d-flex'>
						<FiltersSideBar params={params} history={this.props.history} products={filteredProducts} />
						<ProductsList products={sortedProducts} />
					</div>
				</div>
			</Layout>
		);
	}
}

function mapStateToProps(state) {
	return {
		products: state.products.data,
		categories: state.categories.data,
		favorites: state.user.data.favorites
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
