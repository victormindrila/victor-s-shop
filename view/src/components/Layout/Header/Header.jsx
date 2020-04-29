import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

import logo from '../../../assets/images/logo.png';
import { ReactComponent as ShoppingCart } from '../../../assets/icons/shopping-cart.svg';
import { ReactComponent as UserIcon } from '../../../assets/icons/user.svg';

export default function Header(props) {
	return (
		<header className='border-bottom shadow'>
			<div className='d-flex justify-content-between align-items-center container-fluid container py-4'>
				<div>
					<Link class='navbar-brand mr-5' to='#'>
						<img src={logo} alt='Logo' />
					</Link>
					<Link className='h5' to='/'>
						MEZELURI
					</Link>
					<Link className='h5' to='/'>
						AFUMATURI
					</Link>
					<Link className='h5' to='/'>
						SALAMURI
					</Link>
					<Link className='h5' to='/'>
						PROMOTII
					</Link>
					<Link className='h5' to='/'>
						DESPRE NOI
					</Link>
				</div>
				<div className='d-flex justify-content-between align-items-center'>
					<UserIcon className='m1-2' />
					<Link to='/login'>
						<ShoppingCart className='ml-2 m1-2' />
					</Link>
				</div>
			</div>
		</header>
	);
}
