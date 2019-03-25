export const ADD_TODO = 'ADD_TODO';

const addNewTodo = newTodo => ({ type: ADD_TODO, payload: newTodo });

export const setNewTodo = newTodo => {
	return dispatch => {
		dispatch(addNewTodo(newTodo));
	};
};
