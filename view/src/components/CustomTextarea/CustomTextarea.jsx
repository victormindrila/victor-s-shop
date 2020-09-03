import React from 'react';

function CustomTextarea({ label, value, onChange, ...otherProps }) {
	return (
		<div className='form-group'>
			<label className='label'>{label} </label>
			<textarea value={value} onChange={onChange} {...otherProps}>
				{value}
			</textarea>
		</div>
	);
}

export default CustomTextarea;
