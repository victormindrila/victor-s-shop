import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import DocumentHead from './DocumentHead/DocumentHead';
import './Layout.css';

function Layout({ title, content, children }) {
	return (
		<React.Fragment>
			<DocumentHead title={title} content={content} />
			<div className='layout'>
				<Header />
				{children}
				<Footer />
			</div>
		</React.Fragment>
	);
}

export default Layout;
