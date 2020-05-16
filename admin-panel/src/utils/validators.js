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

	if (isEmpty(data.email)) errors.email = 'Te rog sa completezi acest camp';
	if (!isEmail(data.email)) errors.email = 'Adresa de email invalida';
	if (isEmpty(data.password)) errors.password = 'Te rog sa completezi acest camp';
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
