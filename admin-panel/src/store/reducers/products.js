const initialState = {
	data: '',
	loading: false,
	error: ''
};

export function productsReducer(state = initialState, action) {
	switch (action.type) {
		case 'START_LOADING_PRODUCTS':
			return {
				...state,
				loading: true
			};
		case 'UPDATE_PRODUCTS_DATA':
			return {
				...state,
				data: action.payload,
				loading: false
			};
		case 'UPDATE_ERROR_PRODUCTS':
			return {
				...state,
				error: action.payload,
				loading: false
			};
		default:
			return state;
	}
}
