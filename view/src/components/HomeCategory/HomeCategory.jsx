import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedImage from '../AnimatedImage/AnimatedImage';
import './HomeCategory.scss';

const HomeCategory = (props) => {
	const { route, name, description, image } = props;

	return (
		<div className='col-12 col-md-6 mb-3 home-category'>
			<Link to={`/products/?category=${route}`}>
				<div className='w-100 home-category-image'>
					<AnimatedImage imageUrl={image} alt={name} className='w-100' />
				</div>
				<h2 className='h4 my-1'>
					<strong>{name}:</strong>
				</h2>
				<p className='m-0'>{description}</p>
			</Link>
		</div>
	);
};

export default HomeCategory;
