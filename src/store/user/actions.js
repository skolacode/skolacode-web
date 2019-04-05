import http from '../../utils/http';

export const GET_USER = 'GET_USER';

const getUser = user => ({ type: GET_USER, payload: user });

export const fetchUser = (req = {}) => {
	return async dispatch => {
		try {
			const response = await http.GET('/user/profile', {});
			dispatch(getUser(response));
			req.success();
		} catch(err) {
			req.error();
			console.error(err);
		}
	};
};
