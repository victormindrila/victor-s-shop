import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
	return (
		<header>
			<nav className='navbar navbar-bottom'>
				<div className='container navbar-container'>
					<div>
						<Link to='/admin/products'>
							<h3 className='title'>Admin Panel</h3>
						</Link>
					</div>
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
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
}

export default Header;
