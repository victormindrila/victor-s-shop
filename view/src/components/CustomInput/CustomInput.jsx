import React from 'react';

function CustomInput({ htmlFor, label, onChange, ...rest }) {
	return (
		<React.Fragment>
			<label htmlFor={htmlFor}>{label}</label>
			<input
				{...rest}
				onChange={(e) => {
					onChange(e);
				}}
			/>
		</React.Fragment>
	);
}

export default CustomInput;
