import React from 'react';

function BackButton({ goBack }) {
	return (
		<button className='btn btn-outline-dark my-3' onClick={() => goBack()}>
			Back
		</button>
	);
}

export default BackButton;
