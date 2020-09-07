import React from 'react';
import Fade from 'react-reveal/Fade';
import useIntersectionObserver from '../../utils/useIntersectionObserver';

function AnimatedImage({ imageUrl, alt, ...rest }) {
	const ref = React.useRef();
	const [ isVisible, setIsVisible ] = React.useState(false);
	useIntersectionObserver({
		target: ref,
		onIntersect: ([ { isIntersecting } ], observerElement) => {
			if (isIntersecting) {
				setIsVisible(true);
				observerElement.unobserve(ref.current);
			}
		}
	});

	return (
		<div ref={ref}>
			{isVisible && (
				<Fade>
					<img src={imageUrl} alt={alt} {...rest} />
				</Fade>
			)}
		</div>
	);
}

export default AnimatedImage;
