import React from 'react';
import Layout from '../../components/Layout/Layout';
import { Link } from 'react-router-dom';

function Page404() {
	return (
		<Layout title='Page Not Found'>
			<div className='d-flex flex-column align-items-center'>
				<p className='h3'>OOOPS! PAGE 404!</p>
				<Link to='/'>
					<button className='btn btn-outline-dark'>Back to home</button>
				</Link>
			</div>
		</Layout>
	);
}

export default Page404;
