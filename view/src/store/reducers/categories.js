const initialState = {
	data: '',
	loading: false,
	error: ''
};

export function categoriesReducer(state = initialState, action) {
	switch (action.type) {
		case 'START_LOADING_CATEGORIES':
			return {
				...state,
				loading: true
			};
		case 'UPDATE_CATEGORIES_DATA':
			return {
				...state,
				data: action.payload,
				loading: false
			};
		case 'UPDATE_ERROR_CATEGORIES':
			return {
				...state,
				error: action.payload,
				loading: false
			};
		default:
			return state;
	}
}
