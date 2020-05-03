import axios from 'axios';
import { updateProductsData } from './products';

export function startLoadingProduct() {
	return {
		type: 'START_LOADING_PRODUCT'
	};
}

export function updateProductData(payload) {
	return {
		type: 'UPDATE_PRODUCT_DATA',
		payload
	};
}

export function updateErrorProduct(payload) {
	return {
		type: 'UPDATE_ERROR_PRODUCT',
		payload
	};
}

export function updateSuccessProduct(payload) {
	return {
		type: 'UPDATE_SUCCESS_PRODUCT',
		payload
	};
}

export function addProduct(productData, productImage) {
	return (dispatch) => {
		console.log(productData);

		dispatch(startLoadingProduct());
		const authToken = localStorage.getItem('Authorization');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.post('http://localhost:5000/aligo-test/us-central1/api/admin/product', productData)
			.then((response) => {
				const formData = new FormData();
				formData.append('productId', response.data.id);
				formData.append('image', productImage);
				return axios.post('http://localhost:5000/aligo-test/us-central1/api/admin/product/image', formData, {
					headers: {
						'content-type': 'multipart/form-data'
					}
				});
			})
			.then((response) => {
				dispatch(updateSuccessProduct(response.data));
			})
			.catch((error) => {
				dispatch(updateErrorProduct(error.response.data));
			});
	};
}

export function updateProduct() {
	// todo
}

export function deleteProduct(id) {
	return (dispatch) => {
		dispatch(startLoadingProduct());
		const authToken = localStorage.getItem('Authorization');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.delete(`http://localhost:5000/aligo-test/us-central1/api/admin/product/${id}`)
			.then((response) => {
				return axios.get('http://localhost:5000/aligo-test/us-central1/api/admin/products');
			})
			.then((response) => {
				const payload = response.data;
				dispatch(updateProductsData(payload));
				dispatch(startLoadingProduct());
			})
			.catch((error) => {
				dispatch(updateErrorProduct(error.response.data));
				dispatch(startLoadingProduct());
			});
	};
}
