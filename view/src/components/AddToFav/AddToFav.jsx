import React from 'react';
import './AddToFav.css';
import { ReactComponent as FavoriteSmall } from '../../assets/icons/favorite_small.svg';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUserData } from '../../store/actions/user';

function AddToFav({ productId, userEmail, userFavorites, getUserData }) {
	const isFavorite = () => userFavorites.some((favorite) => favorite === productId);
	function addToFavorites(productId) {
		const authToken = localStorage.getItem('Authorization');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.post('/favorite/', {
				productId,
				userEmail
			})
			.then((response) => {
				getUserData();
			})
			.catch((error) => {
				console.log(error);
			});
	}

	function deleteFromFavorites(productId) {
		console.log('delte');
		const authToken = localStorage.getItem('Authorization');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.delete('/favorite/', {
				data: {
					productId,
					userEmail
				}
			})
			.then((response) => {
				console.log(response);
				getUserData();
			})
			.catch((error) => {
				console.log(error);
			});
	}

	function handleOnIconClick(productId) {
		if (isFavorite() === true) {
			console.log(isFavorite());
			deleteFromFavorites(productId);
		} else {
			console.log(isFavorite());
			addToFavorites(productId);
		}
	}

	return (
		<div className={`add-to-fav ${isFavorite() ? 'is-red' : ''}`} onClick={(e) => handleOnIconClick(productId)}>
			<FavoriteSmall />
		</div>
	);
}

function mapDispatchToProps(dispatch) {
	return {
		getUserData: () => {
			dispatch(getUserData());
		}
	};
}

function mapStateToProps(state) {
	return {
		userEmail: state.user.data.email,
		userFavorites: state.user.data.favorites
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AddToFav);
