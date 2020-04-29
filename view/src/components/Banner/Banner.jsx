import React from 'react';
import { Link } from 'react-router-dom';

import './Banner.css';

function Banner(props) {
	const { background } = props;
	return (
		<div className='banner container-fluid' style={{ backgroundImage: `url(${background})` }}>
			<div className='container'>
				<p>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor consectetur veniam perferendis sed officiis,
					recusandae vero velit perspiciatis? Repellendus sapiente atque quae pariatur ut eius ullam deleniti nobis,
					illo dignissimos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam expedita cumque id!
					Accusamus totam quod hic voluptatum. Explicabo, sint dignissimos ipsa dolores quam facere. Sed provident nobis
					quod iure reiciendis?
				</p>

				<p>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta, quo culpa fugit eum accusantium itaque
					provident nisi perspiciatis, in dignissimos tenetur voluptatum molestias incidunt tempore quae voluptas.
					Tenetur, sint harum!
				</p>
			</div>
		</div>
	);
}

export default Banner;
