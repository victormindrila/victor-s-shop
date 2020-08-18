import { createSelector } from 'reselect';

const selectCategories = (state) => state.categories;

export const selectCategoriesData = createSelector([ selectCategories ], (categories) => categories.data);

export const selectCategoriesLoading = createSelector([ selectCategoriesData ], (categories) => categories.loading);
