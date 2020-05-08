import React from 'react';

function Modal(props) {
	const { active, message, error } = props;
	return (
		<div className={`modal is-medium is-${active ? 'active' : 'default'}`}>
			<div className='modal-background' />
			<div className='modal-content'>
				<article className={`notification is-${props.message ? 'primary' : 'danger'}`}>
					{message && <p>{message}</p>}
					{error && <p>{error}</p>}
				</article>
			</div>
			<button className='modal-close is-large' aria-label='close' />
		</div>
	);
}

export default Modal;

// usage <Modal error={error} message={message} active={true/false} />
