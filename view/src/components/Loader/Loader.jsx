import React from 'react';
import './Loader.css';

function Loader(props) {
	return (
		<div className='spinner-border' role='status'>
			<span className='sr-only'>Loading...</span>
		</div>
	);
}

export default Loader;
