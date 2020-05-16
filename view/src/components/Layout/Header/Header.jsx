import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

import logo from '../../../assets/images/logo/logo.png';
import { ReactComponent as ShoppingCart } from '../../../assets/icons/shopping-cart.svg';
import { ReactComponent as UserIcon } from '../../../assets/icons/user.svg';

export default function Header(props) {
	return (
		<header className='border-bottom mb-3 '>
			<div className='container-fluid container-min-max-width d-flex justify-content-between align-items-center'>
				<Link to='/' className='my-3'>
					<img src={logo} alt={`Victor's shop`} className='logo' />
				</Link>
				<input className='form-control mr-4' type='text' placeholder='Search' />
				<div>
					{props.user ? <p>Salut, {props.user.displayName}!</p> : null}
					<div className='d-flex justify-content-end'>
						{props.user ? (
							<p className='logout h5' onClick={() => props.signOut()}>
								Delogare
							</p>
						) : (
							<Link to='/login' className='h5 mb-0'>
								Logare
							</Link>
						)}
						<div className='d-flex align-items-center'>
							<Link to='/cart' className='d-flex'>
								<ShoppingCart className='ml-2' />
								<p className='ml-1 mb-0'>{props.numberOfProducts}</p>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
