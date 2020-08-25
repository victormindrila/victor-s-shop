import React from 'react';
import './Loader.css';

function Loader() {
	return (
		<div className='loader-wrapper'>
			<div className='spinner-border' role='status'>
				<span className='sr-only'>Loading...</span>
			</div>
		</div>
	);
}

export default Loader;
