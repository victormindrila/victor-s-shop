import { fetchProducts } from '../../apis/endpoints';
import ProductsActionTypes from '../types/products';

export function startLoadingProducts() {
	return {
		type: ProductsActionTypes.START_LOADING_PRODUCTS
	};
}

export function updateProductsData(payload) {
	return {
		type: ProductsActionTypes.UPDATE_PRODUCTS_DATA,
		payload
	};
}

export function updateErrorProducts(payload) {
	return {
		type: ProductsActionTypes.UPDATE_ERROR_PRODUCTS,
		payload
	};
}

export function getAllProducts() {
	return async (dispatch) => {
		dispatch(startLoadingProducts());

		try {
			const payload = await fetchProducts();
			dispatch(updateProductsData(payload));
		} catch (error) {
			dispatch(updateErrorProducts(error.response.data));
		}
	};
}
