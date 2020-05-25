import axios from 'axios';

export function startLoadingProducts() {
	return {
		type: 'START_LOADING_PRODUCTS'
	};
}

export function updateProductsData(payload) {
	return {
		type: 'UPDATE_PRODUCTS_DATA',
		payload
	};
}

export function updateErrorProducts(payload) {
	return {
		type: 'UPDATE_ERROR_PRODUCTS',
		payload
	};
}

export function getAllProducts() {
	return (dispatch) => {
		dispatch(startLoadingProducts());

		const authToken = localStorage.getItem('Authorization');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.get('/admin/products')
			.then((response) => {
				const payload = response.data;
				dispatch(updateProductsData(payload));
			})
			.catch((error) => {
				dispatch(updateErrorProducts(error.response.data));
			});
	};
}
