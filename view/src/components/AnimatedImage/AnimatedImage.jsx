import React from 'react';
import Fade from 'react-reveal/Fade';

function AnimatedImage({ imageUrl, alt, ...rest }) {
	return (
		<div>
			<Fade>
				<img src={imageUrl} alt={alt} {...rest} />
			</Fade>
		</div>
	);
}

export default AnimatedImage;
