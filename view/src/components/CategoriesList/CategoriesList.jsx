import React from 'react';
import HomeCategory from '../../components/HomeCategory/HomeCategory';

function CategoriesList({ categories }) {
	return (
		<div className='row'>
			{categories.map((category) => {
				return <HomeCategory category={category} />;
			})}
		</div>
	);
}

export default CategoriesList;
