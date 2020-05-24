import React from 'react';
import { Link } from 'react-router-dom';
// redux
import { connect } from 'react-redux';
import { logoutUser, getUserData } from '../../store/actions/user';

class DropdownUser extends React.Component {
	componentDidMount() {
		if (!this.props.user) this.props.getUserData();
	}
	render() {
		const { isActive, user, logoutUser } = this.props;
		return (
			<div className={`dropdown-menu ${isActive ? 'show' : ''}`}>
				{user ? <p className='ml-4'>Salut, {user.firstName || user.displayName}!</p> : null}

				{user ? (
					<div>
						<div className='dropdown-divider' />
						<button className='dropdown-item' onClick={() => logoutUser()}>
							Log Out
						</button>
					</div>
				) : (
					<div>
						<Link to='/login' className='dropdown-item'>
							Log In
						</Link>
						<div className='dropdown-divider' />
						<Link to='/signup' className='dropdown-item'>
							Sign Up
						</Link>
					</div>
				)}
			</div>
		);
	}
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
		},
		getUserData: () => {
			dispatch(getUserData());
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(DropdownUser);
