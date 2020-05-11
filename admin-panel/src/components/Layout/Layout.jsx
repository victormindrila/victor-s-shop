import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Aside from './Aside/Aside';
import './Layout.css';

function Layout(props) {
	return (
		<div>
			<Header />
			<div className='is-flex'>
				<Aside />
				<div className='content'>
					<div className='container box'>{props.children}</div>
				</div>
			</div>

			<Footer />
		</div>
	);
}

export default Layout;
