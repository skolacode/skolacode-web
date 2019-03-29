import { combineReducers } from 'redux';

import todoReducer from './todo/reducer';
import authReducer from './auth/reducer';
import articlesReducer from './articles/reducer';

export default combineReducers({
	todoReducer,
	authReducer,
	articlesReducer,
});