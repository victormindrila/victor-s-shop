import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// css
import './Header.css';

// assets
import logo from '../../../assets/images/logo/logo.png';
import { ReactComponent as ShoppingCart } from '../../../assets/icons/shopping-cart.svg';

import { ReactComponent as Favorite } from '../../../assets/icons/favorite.svg';

//components
import DropdownUser from '../../Dropdown/DropdownUser';
import DropdownSearch from '../../Dropdown/DropdownSearch';

function Header({ numberOfProducts, user }) {
	return (
		<header className='border-bottom mb-3 '>
			<div className='container-fluid container-min-max-width d-flex justify-content-between align-items-center'>
				<Link to='/' className='my-3'>
					<img src={logo} alt={`Victor's shop`} className='logo' />
				</Link>

				<DropdownSearch />
				<DropdownUser />

				<div>
					<div className='d-flex justify-content-end'>
						<div className='d-flex align-items-center'>
							<Link to='/products/?category=favorites' className='d-flex'>
								<Favorite className='mr-2' />
								<p className='products-number ml-1 mb-0'>{user.data && user.data.favorites.length}</p>
							</Link>

							<Link to='/cart' className='d-flex'>
								<ShoppingCart className='ml-2' />
								<p className='products-number ml-1 mb-0'>{numberOfProducts}</p>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}

function mapStateToProps(state) {
	return {
		numberOfProducts: state.cart.products.length,
		user: state.user
	};
}

export default connect(mapStateToProps)(Header);
