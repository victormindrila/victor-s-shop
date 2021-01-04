import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

//selectors
import { selectNumberOfProductsInCart } from '../../../store/selectors/cart';
import { selectNumberOfFavoritesProducts } from '../../../store/selectors/user';

// css
import './Header.scss';

// assets
import logo from '../../../assets/images/logo/victor-s-shop.png';
import { ReactComponent as ShoppingCart } from '../../../assets/icons/shopping-cart.svg';

import { ReactComponent as Favorite } from '../../../assets/icons/favorite.svg';

//components
import DropdownUser from '../../Dropdown/DropdownUser';
import DropdownSearch from '../../Dropdown/DropdownSearch';

function Header({ numberOfProducts, numberOfFavorites }) {
	return (
		<header className='border-bottom mb-3 '>
			<div className='nav-bar container-fluid container-min-max-width d-flex justify-content-between align-items-center'>
				<Link to='/' className='my-3 logo-link'>
					<img src={logo} alt={`Victor's shop`} className='logo' />
				</Link>

				<div className='search-wrapper w-100 mr-4'>
					<DropdownSearch />
				</div>

				<div className='icons-wrapper d-flex'>
					<DropdownUser />
					<div>
						<div className='d-flex justify-content-end'>
							<div className='d-flex align-items-center'>
								<Link to='/products/?category=favorites' className='d-flex'>
									<Favorite className='mr-1' />
									<p className='products-number ml-1 mb-0'>{numberOfFavorites}</p>
								</Link>

								<Link to='/cart' className='d-flex'>
									<ShoppingCart className='ml-2' />
									<p className='products-number ml-1 mb-0'>{numberOfProducts}</p>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}

const mapStateToProps = createStructuredSelector({
	numberOfProducts: selectNumberOfProductsInCart,
	numberOfFavorites: selectNumberOfFavoritesProducts
});

export default connect(mapStateToProps)(Header);
