import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import './Layout.css';

function Layout(props) {
	return (
		<div className='layout'>
			<Header />
			{props.children}
			<Footer />
		</div>
	);
}

export default Layout;
