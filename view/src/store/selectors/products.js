import { createSelector } from 'reselect';

import { selectUserFavorites } from './user';

const selectProducts = (state) => state.products;

export const selectURLSearchParams = (state, ownProps) => new URLSearchParams(ownProps.history.location.search);

const selectFilters = createSelector([ selectURLSearchParams ], (params) => {
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
});

const selectSort = createSelector([ selectURLSearchParams ], (params) => {
	let sortBy = 'default';
	for (let pair of params.entries()) {
		if (pair[0] === 'sort') {
			sortBy = pair[1];
		}
	}
	return sortBy;
});

export const selectProductsData = createSelector([ selectProducts ], (products) => products.data);

export const selectProductsLoading = createSelector([ selectProducts ], (products) => products.loading);

export const selectFilteredProducts = createSelector(
	[ selectProductsData, selectFilters, selectUserFavorites ],
	(products, filters, favorites) => {
		let filteredProducts = products.slice();
		if (!filters) return filteredProducts;

		if (filters.category) {
			if (filters.category === 'favorites' && favorites) {
				filteredProducts = products.filter((product) => favorites.some((element) => element === product.id));
			} else {
				filteredProducts = products.filter((product) => product.category.id === filters.category);
			}
		}

		for (let item of [ ...Object.keys(filters) ]) {
			if (item !== 'category') {
				if (item === 'minPriceInput') {
					filteredProducts = filteredProducts.filter((product) => Number(product.price) >= Number(filters[item]));
				} else if (item === 'maxPriceInput') {
					filteredProducts = filteredProducts.filter((product) => Number(product.price) <= Number(filters[item]));
				} else {
					filteredProducts = filteredProducts.filter((product) => product[item] === filters[item]);
				}
			}
		}
		return filteredProducts;
	}
);

export const selectSortedProducts = createSelector([ selectFilteredProducts, selectSort ], (filteredProducts, sort) => {
	const arrCpy = filteredProducts.slice();
	if (sort === 'ascending') {
		arrCpy.sort((a, b) => {
			if (Number(a.price) < Number(b.price)) {
				return -1;
			}
			if (Number(a.price) > Number(b.price)) {
				return 1;
			}
			return 0;
		});
	} else if (sort === 'descending') {
		arrCpy.sort((a, b) => {
			if (Number(a.price) > Number(b.price)) {
				return -1;
			}
			if (Number(a.price) < Number(b.price)) {
				return 1;
			}
			return 0;
		});
	} else if (sort === 'default') {
		return filteredProducts;
	}
	return arrCpy;
});

export const selectFilterOptions = createSelector([ selectProductsData ], (products) => {
	const brands = [];
	const materials = [];
	const prices = [];

	products.forEach((item) => {
		brands.push(item['brand']);
		materials.push(item['material']);
		prices.push(item['price']);
	});
	return {
		brands: [ ...new Set(brands) ],
		materials: [ ...new Set(materials) ],
		prices: [ ...new Set(prices) ]
	};
});
