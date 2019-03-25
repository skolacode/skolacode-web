import { ADD_TODO } from './actions';

export type TodoReducerType = {
	todo: string;
}

const initState = {
	todo: 'TESTING TODO',
};

const todoReducer = (state = initState, action) => {
	switch (action.type) {
	case ADD_TODO:
		return {
			...state,
			todo: action.payload,
		};
	default:
		return state;
	}
};

export default todoReducer;