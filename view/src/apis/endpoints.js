import axios from './axios';
import { signInWithGoogle } from './firebase';

export const fetchCategories = async () => {
	const response = await axios.get('/categories');
	return response.data;
};

export const fetchProducts = async () => {
	const response = await axios.get('/products');
	return response.data;
};

export const loginUserWithEmail = async (email, password) => {
	const userData = {
		email,
		password
	};

	const response = await axios.post('/login', userData);
	return response.data;
};

export const signUpUserWithEmail = async (userData) => {
	const response = await axios.post('/signup', userData);
	return response.data;
};

export const fetchUserData = async () => {
	const response = await axios.get('/user');
	return response.data;
};

export const loginWithGoogleApi = async () => {
	const response = await signInWithGoogle();
	const data = response.user;
	return {
		token: data.xa,
		data: {
			firstName: data.displayName.split(' ')[0],
			lastName: data.displayName.split(' ')[1],
			phoneNumber: 123456,
			country: 'Not provided',
			email: data.email,
			uid: data.uid
		}
	};
};

export const setUserDetails = async (data) => {
	const response = await axios.post('/user/setDetails', data);
	return response.data;
};

export const addToFavorites = async (productId, userEmail) => {
	try {
		await axios.post('/favorite/', {
			productId,
			userEmail
		});
	} catch (error) {
		console.log(error);
	}
};

export const deleteFromFavorites = async (productId, userEmail) => {
	try {
		await axios.delete('/favorite/', {
			data: {
				productId,
				userEmail
			}
		});
	} catch (error) {
		console.log(error);
	}
};

export const fetchProductData = async (productId, cb) => {
	const response = await axios.get(`/product/`, {
		params: {
			productId
		}
	});

	cb(response);
};

export const orderSubmit = async (order, cb) => {
	await axios.post('/order', order);
	cb();
};
