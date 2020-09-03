import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { userReducer } from './user/user';
import { productsReducer } from './products/products';
import { categoriesReducer } from './categories/categories';
import { cartReducer } from './cart/cart';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: [ 'cart' ] /*the reducer we want to persist*/
};

const rootReducer = combineReducers({
	products: productsReducer,
	categories: categoriesReducer,
	cart: cartReducer,
	user: userReducer
});

export default persistReducer(persistConfig, rootReducer);
