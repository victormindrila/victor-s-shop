import ProductsActionTypes from '../../types/products';
const initialState = {
	data: [],
	loading: false,
	error: ''
};

export function productsReducer(state = initialState, action) {
	switch (action.type) {
		case ProductsActionTypes.START_LOADING_PRODUCTS:
			return {
				...state,
				loading: true
			};
		case ProductsActionTypes.UPDATE_PRODUCTS_DATA:
			return {
				...state,
				data: [ ...state.data, ...action.payload ],
				loading: false
			};
		case ProductsActionTypes.UPDATE_ERROR_PRODUCTS:
			return {
				...state,
				error: action.payload,
				loading: false
			};
		default:
			return state;
	}
}
