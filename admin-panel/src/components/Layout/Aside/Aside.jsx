import React from 'react';
import { Link } from 'react-router-dom';
import './Aside.css';

function Aside(props) {
	const isActive = (currentPath) => window.location.pathname.includes(currentPath);
	return (
		<aside class='menu'>
			<ul class='menu-list'>
				<li />
				<li>
					<Link className={isActive('/admin/users') && 'is-active'} to={'/admin/users/'}>
						Users
					</Link>
				</li>
				<li>
					<Link className={isActive('/admin/products') && 'is-active'} to={'/admin/products/'}>
						Products
					</Link>
				</li>
				<li>
					<Link className={isActive('/admin/categories') && 'is-active'} to={'/admin/categories/'}>
						Categories
					</Link>
				</li>
				<li>
					<Link className={isActive('/admin/orders') && 'is-active'} to={'/admin/orders'}>
						Orders
					</Link>
				</li>
			</ul>
		</aside>
	);
}

export default Aside;
