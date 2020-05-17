import axios from 'axios';

export function startLoadingCategories() {
	return {
		type: 'START_LOADING_CATEGORIES'
	};
}

export function updateCategoriesData(payload) {
	return {
		type: 'UPDATE_CATEGORIES_DATA',
		payload
	};
}

export function updateErrorCategories(payload) {
	return {
		type: 'UPDATE_ERROR_CATEGORIES',
		payload
	};
}

export function getAllCategories() {
	return (dispatch) => {
		dispatch(startLoadingCategories());
		axios
			.get('http://localhost:5000/aligo-test/us-central1/api/categories')
			.then((response) => {
				const payload = response.data;
				dispatch(updateCategoriesData(payload));
			})
			.catch((error) => {
				dispatch(updateErrorCategories(error.response.data));
			});
	};
}
