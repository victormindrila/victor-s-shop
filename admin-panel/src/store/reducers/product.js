const initialState = {
	data: '',
	loading: false,
	error: '',
	success: ''
};

export function productReducer(state = initialState, action) {
	switch (action.type) {
		case 'START_LOADING_PRODUCT':
			return {
				...state,
				loading: !state.loading
			};
		case 'UPDATE_PRODUCT_DATA':
			return {
				...state,
				data: action.payload,
				loading: false
			};
		case 'UPDATE_ERROR_PRODUCT':
			return {
				...state,
				error: action.payload,
				loading: false
			};
		case 'UPDATE_SUCCESS_PRODUCT':
			return {
				...state,
				success: action.payload,
				loading: false
			};
		default:
			return state;
	}
}
