import React from 'react';

function Dropdown({ isActive, items }) {
	return (
		<div class='dropdown-menu show'>
			<a class='dropdown-item' href='#'>
				Action
			</a>
			<a class='dropdown-item' href='#'>
				Another action
			</a>
			<a class='dropdown-item' href='#'>
				Something else here
			</a>
			<div class='dropdown-divider' />
			<a class='dropdown-item' href='#'>
				Separated link
			</a>
		</div>
	);
}

export default Dropdown;
