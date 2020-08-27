import { createSelector } from 'reselect';

import { selectURLSearchParams } from './products';

const selectCategories = (state, ownProps) => state.categories;

export const selectCategoriesData = createSelector([ selectCategories ], (categories) => categories.data);

export const selectCategoriesLoading = createSelector([ selectCategories ], (categories) => categories.loading);

const selectCategoryId = createSelector([ selectURLSearchParams ], (params) => params.get('category'));

export const selectCategoryName = createSelector(
	[ selectCategoriesData, selectCategoryId ],
	(categories, categoryId) => {
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
);
