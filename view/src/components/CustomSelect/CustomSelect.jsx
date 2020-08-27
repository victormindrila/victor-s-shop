import React from 'react';

function CustomSelect({ defaultOption, options, handleOptionSelect, ...rest }) {
	return (
		<select {...rest} onChange={(e) => handleOptionSelect(e.target.name, e.target.value)}>
			<option value=''>{defaultOption}</option>
			{options.map((option, index) => {
				return (
					<option value={option} key={index}>
						{option}
					</option>
				);
			})}
		</select>
	);
}

export default CustomSelect;
