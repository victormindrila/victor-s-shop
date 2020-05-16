import React from 'react';
import './Loader.css';

function Loader(props) {
	return (
		<div class='spinner-border' role='status'>
			<span class='sr-only'>Loading...</span>
		</div>
	);
}

export default Loader;
