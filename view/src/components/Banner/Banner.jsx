import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedImage from '../AnimatedImage/AnimatedImage';

import './Banner.css';

function Banner({ background, link, tagLine }) {
	return (
		<div className='banner'>
			<div className='image-wrapper'>
				<AnimatedImage imageUrl={background} alt='promotion banner' />
				<div className='banner-elements d-flex flex-column justify-content-center align-items-center'>
					<h2 className='my-5'>{tagLine}</h2>
					<Link to={`${link}`}>
						<button className='banner-button btn btn-dark'>Show Products</button>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Banner;
