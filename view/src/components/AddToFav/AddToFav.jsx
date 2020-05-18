import React from 'react';
import './AddToFav.css';
import { ReactComponent as FavoriteSmall } from '../../assets/icons/favorite_small.svg';
import axios from 'axios';
import { connect } from 'react-redux';

function AddToFav({ productId, user }) {
	function handleAddToFavorites(productId) {
		const { email } = user;
		const authToken = localStorage.getItem('Authorization');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.post('/favorite/', {
				productId,
				email
			})
			.then((response) => {
				console.log('addeds to favs');
			})
			.catch((error) => {
				console.log(error);
			});
	}

	return (
		<div className='add-to-fav' onClick={(e) => handleAddToFavorites(productId)}>
			<FavoriteSmall />
		</div>
	);
}

function mapStateToProps(state) {
	return {
		user: state.user.data
	};
}

export default connect(mapStateToProps)(AddToFav);
