import { signInWithGoogle } from '../../apis/firebase';
import axios from 'axios';

export function startLoading() {
	return {
		type: 'START_LOADING'
	};
}

export function updateUserData(payload) {
	return {
		type: 'UPDATE_USER_DATA',
		payload
	};
}

export function updateError(payload) {
	return {
		type: 'UPDATE_ERROR',
		payload
	};
}

export function loginUserWithGoogle() {
	return (dispatch) => {
		dispatch(startLoading());

		signInWithGoogle()
			.then((response) => {
				const payload = response.user;

				dispatch(updateUserData(payload));
			})
			.catch((error) => {
				dispatch(updateError(error));
			});
	};
}

export function loginUser(email, password) {
	return (dispatch) => {
		dispatch(startLoading());

		const userData = {
			email,
			password
		};

		axios
			.post('http://localhost:5000/aligo-test/us-central1/api/login', userData)
			.then((response) => {
				const payload = response.data;
				localStorage.setItem('Authorization', 'Bearer ' + payload.token);
				dispatch(getUserData());
			})
			.catch((error) => {
				if (!error.response) {
					dispatch(updateError({ error: 'no response from resource' }));
				} else {
					dispatch(updateError(error.response.data));
				}
			});
	};
}

export function logoutUser() {
	return (dispatch) => {
		localStorage.clear();
		dispatch(updateUserData(null));
	};
}

export function signUpUser(userData) {
	return (dispatch) => {
		dispatch(startLoading());

		axios
			.post('http://localhost:5000/aligo-test/us-central1/api/signup', userData)
			.then((response) => {
				const payload = response.data;
				localStorage.setItem('Authorization', 'Bearer ' + payload.token);
				dispatch(updateUserData(payload));
			})
			.catch((error) => {
				dispatch(updateError(error.response.data));
			});
	};
}

export function getUserData() {
	return (dispatch) => {
		dispatch(startLoading());
		const authToken = localStorage.getItem('Authorization');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.get('http://localhost:5000/aligo-test/us-central1/api/user')
			.then((response) => {
				const payload = response.data;
				dispatch(updateUserData(payload));
			})
			.catch((error) => {
				dispatch(updateError(error.response.data));
			});
	};
}
