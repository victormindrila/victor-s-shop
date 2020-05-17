const isEmpty = (input) => {
	if (input === '') return true;
	if (input === 0) return true;
	else return false;
};

const isEmail = (email) => {
	// eslint-disable-next-line
	const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (email.match(emailRegEx)) return true;
	else return false;
};

exports.validateLoginData = (data) => {
	let errors = {};

	if (isEmpty(data.email)) errors.email = 'Must not be empty';
	if (!isEmail(data.email)) errors.email = 'Must be a valid email address';
	if (isEmpty(data.password)) errors.password = 'Must not be empty';
	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false
	};
};

exports.validateSignUpData = (data) => {
	let errors = {};

	if (isEmpty(data.email)) {
		errors.email = 'Must not be empty';
	} else if (!isEmail(data.email)) {
		errors.email = 'Must be valid email address';
	}

	if (isEmpty(data.firstName)) errors.firstName = 'Must not be empty';
	if (isEmpty(data.lastName)) errors.lastName = 'Must not be empty';
	if (isEmpty(data.phoneNumber)) errors.phoneNumber = 'Must not be empty';
	if (isEmpty(data.country)) errors.country = 'Must not be empty';

	if (isEmpty(data.password)) errors.password = 'Must not be empty';
	if (data.password !== data.confirmPassword) errors.confirmPassword = 'Passwords must be the same';

	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false
	};
};

exports.validateNewProductData = (data) => {
	let errors = {};
	let keys = Object.keys(data);

	for (let i = 0; i < keys.length; i++) {
		if (isEmpty(data[keys[i]])) errors[keys[i]] = 'Must not be empty';
	}

	if (isNaN(data.price)) errors.price = 'Must be a number';

	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false
	};
};

exports.validateNewCategoryData = (data) => {
	let errors = {};

	if (isEmpty(data.description)) errors.description = 'Must not be empty';
	if (isEmpty(data.name)) errors.name = 'Must not be empty';

	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false
	};
};
