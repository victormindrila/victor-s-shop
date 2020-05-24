import React from 'react';
import { Link } from 'react-router-dom';
// redux
import { connect } from 'react-redux';
import { logoutUser, getUserData } from '../../store/actions/user';

// components
import { ReactComponent as UserIcon } from '../../assets/icons/user.svg';

//CSS
import './DropdownUser.css';
class DropdownUser extends React.Component {
	constructor() {
		super();
		this.state = {
			show: false
		};
		this.setWrapperRef = this.setWrapperRef.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
	}

	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutside);
		if (!this.props.user) this.props.getUserData();
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside);
	}

	setWrapperRef(node) {
		this.wrapperRef = node;
	}

	handleClick() {
		this.setState({ show: !this.state.show });
	}

	handleClickOutside(event) {
		if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
			this.setState({
				show: false
			});
		}
	}
	render() {
		const { user, logoutUser } = this.props;
		return (
			<div className='dropdown' ref={this.setWrapperRef}>
				<UserIcon className='mr-2 user-icon' onClick={() => this.handleClick()} />
				<div className={`dropdown-menu ${this.state.show ? 'show' : ''}`}>
					{user ? <p className='ml-4'>Salut, {user.firstName || user.displayName}!</p> : null}

					{user ? (
						<div>
							<div className='dropdown-divider' />
							<button
								className='dropdown-item'
								onClick={() => {
									logoutUser();
									this.handleClick();
								}}>
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
