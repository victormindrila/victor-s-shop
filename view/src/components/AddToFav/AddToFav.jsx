import React from 'react';
import './AddToFav.css';
import { ReactComponent as FavoriteSmall } from '../../assets/icons/favorite_small.svg';

function AddToFav() {
	return (
		<div className='add-to-fav'>
			<FavoriteSmall />
		</div>
	);
}

export default AddToFav;
