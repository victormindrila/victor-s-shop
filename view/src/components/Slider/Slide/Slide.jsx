import React from 'react';
import './Slide.css';
import Banner from '../../Banner/Banner';

function Slide(props) {
	const { image, link, tagLine, total, active, clickFunction, show } = props;
	return (
		<div>
			<Banner show={show} link={link} tagLine={tagLine} background={image} />

			<div className='dots mt-3'>
				{Array.from(Array(total), (element, index) => (
					<span
						key={index}
						className={active === index ? 'dot active' : 'dot'}
						onClick={(e) => clickFunction(e, index)}
					/>
				))}
			</div>
			<a href='/' className='prev' onClick={(e) => clickFunction(e, active - 1)}>
				&#10094;
			</a>
			<a href='/' className='next' onClick={(e) => clickFunction(e, active + 1)}>
				&#10095;
			</a>
		</div>
	);
}

export default Slide;
