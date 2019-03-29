import http from '../../utils/http';

export const loginUser = async (req = {}) => {
	try {
		await http.GET('/oauth/github', {});
		req.success();
	} catch(err) {
		console.error(err);
		req.error();
	}
};
