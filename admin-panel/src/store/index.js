import { createStore, combineReducers, applyMiddleware } from 'redux';
import { userReducer } from './reducers/user';
import { productsReducer } from './reducers/products';

import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';

const rootReducer = combineReducers({
	products: productsReducer,
	user: userReducer
});

const middleWares = [ ReduxThunk ];

if (process.env.NODE_ENV === 'development') {
	middleWares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middleWares));

export default store;
