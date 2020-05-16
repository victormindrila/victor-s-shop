import React from 'react';

function Error(props) {
	return <p className='alert alert-danger'>{props.error}</p>;
}

export default Error;
