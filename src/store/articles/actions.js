import http from '../../utils/http';

export const GET_PUBLISHED_ARTICLES = 'GET_PUBLISHED_ARTICLES';

const getPublishedArticles = articles => ({ type: GET_PUBLISHED_ARTICLES, payload: articles });

export const fetchPublishedArticles = (req = {}) => {
	return async dispatch => {
		try {
			const response = await http.GET('/articles', {});
			dispatch(getPublishedArticles(response));
			req.success();
		} catch(err) {
			console.error(err);
			req.error();
		}
	};
};
