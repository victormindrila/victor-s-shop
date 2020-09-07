import { fetchCategories } from '../../apis/endpoints';
import CategoriesActionTypes from '../types/categories';
import { isEmptyArray } from '../../utils/misc';

export function startLoadingCategories() {
	return {
		type: CategoriesActionTypes.START_LOADING_CATEGORIES
	};
}

export function updateCategoriesData(payload) {
	return {
		type: CategoriesActionTypes.UPDATE_CATEGORIES_DATA,
		payload
	};
}

export function updateErrorCategories(payload) {
	return {
		type: CategoriesActionTypes.UPDATE_ERROR_CATEGORIES,
		payload
	};
}

export function getAllCategories() {
	return async (dispatch) => {
		dispatch(startLoadingCategories());
		try {
			const payload = await fetchCategories();
			dispatch(updateCategoriesData(payload));
		} catch (error) {
			dispatch(updateErrorCategories(error.response.data));
		}
	};
}

const shouldGetCategories = (state) => {
	const categories = state.categories.data;
	if (isEmptyArray(categories)) {
		return true;
	} else {
		return false;
	}
};

export function getAllCategoriesIfNecessary() {
	return (dispatch, getState) => {
		if (shouldGetCategories(getState())) {
			return dispatch(getAllCategories());
		}
	};
}
