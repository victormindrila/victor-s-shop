import React from 'react';
import { Link } from 'react-router-dom';
// redux
import { connect } from 'react-redux';
import { logoutUser } from '../../store/actions/user';

function DropdownUser({ isActive, user }) {
	return (
		<div className={`dropdown-menu ${isActive ? 'show' : ''}`}>
			{user ? <p className='dropdown-item'>Salut, {user.displayName}!</p> : null}

			{user ? (
				<div>
					<div class='dropdown-divider' />
					<p className='dropdown-item' onClick={() => logoutUser()}>
						Delogare
					</p>
				</div>
			) : (
				<div>
					<Link to='/login' className='dropdown-item'>
						Logare
					</Link>
					<div class='dropdown-divider' />
					<Link to='/signup' className='dropdown-item'>
						Inregistrate
					</Link>
				</div>
			)}
		</div>
	);
}

function mapStateToProps(state) {
	return {
		user: state.user.data
	};
}

function mapDispatchToProps(dispatch) {
	return {
		logoutUser: () => {
			dispatch(logoutUser());
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(DropdownUser);
