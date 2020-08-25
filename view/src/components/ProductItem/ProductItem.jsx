import React from 'react';
import './ProductItem.scss';
import { connect } from 'react-redux';
import { addToCart } from '../../store/actions/cart';
import { Link } from 'react-router-dom';
import AddToFav from '../AddToFav/AddToFav';
import AnimatedImage from '../AnimatedImage/AnimatedImage';

function ProductItem({ title, price, currency, imageUrl, id, addToCart }) {
	return (
		<div className='product-item col-12 col-md-4 col-sm-6 d-flex flex-column justify-content-between align-items-center mb-3'>
			<AddToFav productId={id} />
			<Link to={`/product/${id}`} className='d-flex flex-column justify-content-center align-items-center '>
				<div className='d-flex flex-column justify-content-center align-items-center image-container'>
					<AnimatedImage imageUrl={imageUrl} alt='productPhoto' className='mb-2' />
				</div>
				<p className='mb-1 text-center'>{title}</p>
				<p className='text-center'>{price + currency}</p>
			</Link>
			<button
				className='btn btn-outline-dark'
				onClick={() =>
					addToCart({
						product: {
							id,
							title,
							price,
							currency,
							imageUrl
						}
					})}>
				Add To Cart
			</button>
		</div>
	);
}

function mapDispatchToProps(dispatch) {
	return {
		addToCart: (product) => dispatch(addToCart(product))
	};
}

export default connect(null, mapDispatchToProps)(ProductItem);
