import { createStore, combineReducers, applyMiddleware } from 'redux';
import { userReducer } from './reducers/user';
import { productsReducer } from './reducers/products';
import { categoriesReducer } from './reducers/categories';
import { cartReducer } from './reducers/cart';

import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';

const rootReducer = combineReducers({
	products: productsReducer,
	categories: categoriesReducer,
	cart: cartReducer,
	user: userReducer
});

const middleWares = [ ReduxThunk, logger ];

const store = createStore(rootReducer, applyMiddleware(...middleWares));

export default store;
