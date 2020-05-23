import React from 'react';
import { Link } from 'react-router-dom';

import './Banner.css';

function Banner(props) {
	const { background, link, tagLine } = props;
	return (
		<div className='banner'>
			<div className='image-wrapper'>
				<img src={background} />
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
