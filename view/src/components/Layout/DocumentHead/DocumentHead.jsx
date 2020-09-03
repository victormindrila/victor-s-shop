import React from 'react';
import { Helmet } from 'react-helmet';

function DocumentHead({ title, content = 'Shop for quality knives and other items' }) {
	return (
		<Helmet>
			<title>{"Victor's shop - " + title}</title>
			<meta name='description' content={content} />
		</Helmet>
	);
}

export default DocumentHead;
