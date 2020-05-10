import React from 'react';
import Layout from '../../components/Layout/Layout';

function Page404() {
	return (
		<Layout>
			<section className='hero is-light'>
				<div className='hero-body'>
					<div className='container'>
						<p className='title'>OOOPS! PAGE 404!</p>
						<p className='subtitle'>Could not find this page!</p>
					</div>
				</div>
			</section>
		</Layout>
	);
}

export default Page404;
