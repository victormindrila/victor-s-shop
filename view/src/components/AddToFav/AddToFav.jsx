import React from 'react';
import './AddToFav.css';
import { ReactComponent as FavoriteSmall } from '../../assets/icons/favorite_small.svg';
import { connect } from 'react-redux';
import { getUserData } from '../../store/actions/user';
import { useHistory } from 'react-router-dom';
import { selectUserEmail, selectUserData, selectIsFavorite } from '../../store/selectors/user';

import { addToFavorites, deleteFromFavorites } from '../../apis/endpoints';

function AddToFav({ productId, userData, getUserData, userEmail, isFavorite }) {
	const history = useHistory();

	function handleOnIconClick() {
		if (!userData) {
			history.push('/login');
			return;
		}
		isFavorite
			? deleteFromFavorites(productId, userEmail, getUserData)
			: addToFavorites(productId, userEmail, getUserData);
	}

	return (
		<div className={`add-to-fav ${isFavorite ? 'is-red' : ''}`} onClick={() => handleOnIconClick()}>
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

const mapStateToProps = (state, ownProps) => {
	return {
		userData: selectUserData(state),
		userEmail: selectUserEmail(state),
		isFavorite: selectIsFavorite(state, ownProps)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToFav);
