import React from 'react';
import Error from '../Error/Error';

function CustomInput({ htmlFor, label, onChange, error, ...rest }) {
	return (
		<div className='form-group'>
			{label && <label htmlFor={htmlFor}>{label}</label>}
			<input
				{...rest}
				onChange={(e) => {
					onChange(e);
				}}
			/>
			{error && <Error error={error} />}
		</div>
	);
}

export default CustomInput;
