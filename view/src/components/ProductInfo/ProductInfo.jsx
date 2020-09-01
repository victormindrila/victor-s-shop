import React from 'react';
import AnimatedImage from '../AnimatedImage/AnimatedImage';

function ProductInfo({
	productId,
	product: { title, price, currency, imageUrl, itemNumber, brand, material, weight, description },
	addToCart,
	addToFavorites,
	isFavorite
}) {
	return (
		<div className='product-info d-flex mb-5'>
			<div className='image-wrapper d-flex justify-content-center align-items-center mr-5'>
				<AnimatedImage imageUrl={imageUrl} alt='Product presentation' />
			</div>
			<div className='product-details'>
				<p className='h3 text-danger'>
					{price} {currency}
				</p>
				<button
					className='btn btn-dark mb-4 font-weight-bold'
					onClick={() => {
						addToCart({
							product: {
								id: productId,
								title: title,
								price: price,
								currency: currency,
								imageUrl: imageUrl
							}
						});
					}}>
					Add To Cart
				</button>
				<button
					className='btn btn-dark mb-4 font-weight-bold ml-3'
					onClick={() => {
						addToFavorites(productId);
					}}>
					{isFavorite ? 'Remove from favorites' : 'Add to favorites'}
				</button>
				<p>
					<span className='font-weight-bold'>Item Number</span>: {itemNumber}
				</p>
				<p>
					<span className='font-weight-bold'>Brand</span>: {brand}
				</p>
				<p>
					<span className='font-weight-bold'>Material</span>: {material}
				</p>
				<p>
					<span className='font-weight-bold'>Weight</span>: {weight}
				</p>
				<p className='font-weight-bold mb-1'>Description:</p>
				<p>{description}</p>
			</div>
		</div>
	);
}

export default ProductInfo;
