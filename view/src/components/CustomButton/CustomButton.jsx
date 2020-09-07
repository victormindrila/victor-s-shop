import React from 'react';

import withSpinner from '../HOCs/WithSpinner';

function CustomButton({ children, ...otherProps }) {
	return <button {...otherProps}>{children}</button>;
}

export default withSpinner(CustomButton);
