import { GET_USER } from './actions';

export type UserReducerType = {
	user: Object;
}

const initState = {
	user: {},
};

const userReducer = (state = initState, action) => {
	switch (action.type) {
	case GET_USER:
		return {
			...state,
			user: action.payload,
		};
	default:
		return state;
	}
};

export default userReducer;