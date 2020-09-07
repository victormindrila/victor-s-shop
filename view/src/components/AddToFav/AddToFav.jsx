import React, { useState } from 'react';
import './AddToFav.css';
import { ReactComponent as FavoriteSmall } from '../../assets/icons/favorite_small.svg';
import { connect } from 'react-redux';
import { getUserData } from '../../store/actions/user';
import { useHistory } from 'react-router-dom';
import { selectUserEmail, selectUserData, selectIsFavorite } from '../../store/selectors/user';
import withSpinner from '../HOCs/WithSpinner';

import { addToFavorites, deleteFromFavorites } from '../../apis/endpoints';

const FavoritesWithLoading = withSpinner((props) => <FavoriteSmall {...props} />);

function AddToFav({ productId, userData, getUserData, userEmail, isFavorite }) {
	const history = useHistory();
	const [ loading, setLoading ] = useState(false);

	async function handleOnIconClick() {
		setLoading(true);
		if (!userData) {
			history.push('/login');
			return;
		}
		if (isFavorite) {
			await deleteFromFavorites(productId, userEmail);
		} else {
			await addToFavorites(productId, userEmail);
		}
		getUserData();
		setLoading(false);
	}

	return (
		<div className={`add-to-fav ${isFavorite ? 'is-red' : ''}`}>
			<FavoritesWithLoading onClick={() => handleOnIconClick()} isLoading={loading} />
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
