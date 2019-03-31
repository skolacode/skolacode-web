import { combineReducers } from 'redux';

import todoReducer from './todo/reducer';
import userReducer from './user/reducer';
import articlesReducer from './articles/reducer';

export default combineReducers({
	todoReducer,
	userReducer,
	articlesReducer,
});