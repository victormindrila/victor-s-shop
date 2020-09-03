import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/index';

import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import { persistStore } from 'redux-persist';

const middleWares = [ ReduxThunk ];

if (process.env.NODE_ENV === 'development') {
	middleWares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middleWares));

export const persistor = persistStore(store);

export default { store, persistor };
