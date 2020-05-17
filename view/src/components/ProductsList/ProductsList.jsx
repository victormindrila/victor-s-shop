import React from 'react';
import ProductItem from '../ProductItem/ProductItem';

function ProductsList({ products }) {
	return (
		<div className='container-fluid container-min-max-width'>
			<div className='row my-4'>
				{products.map((product) => {
					return <ProductItem {...product} key={product.id} />;
				})}
			</div>
		</div>
	);
}

export default ProductsList;
