import React from 'react';
import Layout from '../../components/Layout/Layout';

function Page404() {
	return (
		<Layout>
			<section class='hero is-light'>
				<div class='hero-body'>
					<div class='container'>
						<p class='title'>OOOPS! PAGE 404!</p>
						<p class='subtitle'>Could not find this page!</p>
					</div>
				</div>
			</section>
		</Layout>
	);
}

export default Page404;
