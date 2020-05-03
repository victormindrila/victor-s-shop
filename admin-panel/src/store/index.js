import { createStore, combineReducers, applyMiddleware } from 'redux';
import { userReducer } from './reducers/user';
import { productsReducer } from './reducers/products';
import { productReducer } from './reducers/product';

import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';

const rootReducer = combineReducers({
	products: productsReducer,
	user: userReducer,
	product: productReducer
});

const middleWares = [ ReduxThunk, logger ];

const store = createStore(rootReducer, applyMiddleware(...middleWares));

export default store;
