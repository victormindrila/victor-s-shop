import CategoriesActionTypes from '../../types/categories';

const initialState = {
	data: [],
	loading: false,
	error: ''
};

export function categoriesReducer(state = initialState, action) {
	switch (action.type) {
		case CategoriesActionTypes.START_LOADING_CATEGORIES:
			return {
				...state,
				loading: true
			};
		case CategoriesActionTypes.UPDATE_CATEGORIES_DATA:
			return {
				...state,
				data: [ ...state.data, ...action.payload ],
				loading: false
			};
		case CategoriesActionTypes.UPDATE_ERROR_CATEGORIES:
			return {
				...state,
				error: action.payload,
				loading: false
			};
		default:
			return state;
	}
}
