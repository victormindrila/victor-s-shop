import React from 'react';
import Loader from '../Loader/Loader';

const WithSpinner = (WrappedComponent) => ({ isLoading, ...otherProps }) => {
	return isLoading ? <Loader /> : <WrappedComponent {...otherProps} />;
};

export default WithSpinner;
