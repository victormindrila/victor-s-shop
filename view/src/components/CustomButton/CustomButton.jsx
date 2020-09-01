import React from 'react';

import withSpinner from '../WithSpinner/WithSpinner';

function CustomButton({ children, ...otherProps }) {
	return <button {...otherProps}>{children}</button>;
}

export default withSpinner(CustomButton);
