import { createSelector } from 'reselect';

const selectUser = (state, ownProps) => state.user;
const selectCurrentProductId = (state, ownProps) => ownProps.productId || ownProps.match.params.productId;

export const selectUserData = createSelector([ selectUser ], (user) => user.data);

export const selectUserLoading = createSelector([ selectUser ], (user) => user.loading);

export const selectUserError = createSelector([ selectUser ], (user) => user.error);

export const selectUserId = createSelector([ selectUser ], (user) => user.data.userId);

export const selectUserEmail = createSelector([ selectUser ], (user) => user.data && user.data.email);

export const selectUserFavorites = createSelector([ selectUser ], (user) => (user.data && user.data.favorites) || []);

export const selectNumberOfFavoritesProducts = createSelector(
	[ selectUser ],
	(user) => user.data && user.data.favorites && user.data.favorites.length
);

export const selectIsFavorite = createSelector(
	[ selectUserFavorites, selectCurrentProductId ],
	(favorites, productId) => favorites.some((favorite) => favorite === productId)
);

export const isAuthenticated = createSelector([ selectUserData ], (userData) => (userData ? true : false));
