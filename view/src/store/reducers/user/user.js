import UserActionTypes from '../../types/user';
const initialState = {
	data: null,
	loading: false,
	error: ''
};

export function userReducer(state = initialState, action) {
	switch (action.type) {
		case UserActionTypes.START_LOADING:
			return {
				...state,
				loading: true
			};
		case UserActionTypes.UPDATE_USER_DATA:
			return {
				...state,
				data: action.payload,
				loading: false
			};
		case UserActionTypes.UPDATE_ERROR:
			return {
				...state,
				error: action.payload,
				loading: false
			};
		default:
			return state;
	}
}
