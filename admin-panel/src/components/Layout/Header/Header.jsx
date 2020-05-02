import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../../store/actions/user';

function Header(props) {
	const { logoutUser } = props;

	return (
		<header>
			<nav className='navbar navbar-bottom'>
				<div className='container navbar-container'>
					<div>
						<Link to='/admin/products'>
							<h3 className='title'>Admin Panel</h3>
						</Link>
					</div>
					{props.user && <p>{`Salut, ${props.user.firstName} ${props.user.lastName}`}</p>}
					<div className='navbar-item'>
						<div className='navbar-buttons'>
							<div className='navbar-item'>
								<Link to='/admin/products'>
									<i className='fa fa-star' /> Products
								</Link>
							</div>
							<div className='navbar-item'>
								<Link to='/admin/categories'>
									<i className='fa fa-star' /> Categories
								</Link>
							</div>
							<button className='button is-link' onClick={(e) => logoutUser()}>
								Logout
							</button>
						</div>
					</div>
				</div>
			</nav>
		</header>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
