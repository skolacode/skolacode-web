import http from '../../utils/http';

export const GET_PUBLISHED_ARTICLES = 'GET_PUBLISHED_ARTICLES';
export const GET_UNPUBLISHED_ARTICLES = 'GET_UNPUBLISHED_ARTICLES';
export const GET_USER_PUBLISHED_ARTICLES = 'GET_USER_PUBLISHED_ARTICLES';
export const GET_USER_UNPUBLISHED_ARTICLES = 'GET_USER_UNPUBLISHED_ARTICLES';
export const GET_ARTICLE = 'GET_ARTICLE';

const getPublishedArticles = articles => ({ type: GET_PUBLISHED_ARTICLES, payload: articles });
const getUnpublishedArticles = articles => ({ type: GET_UNPUBLISHED_ARTICLES, payload: articles });
const getUserPublishedArticles = articles => ({ type: GET_USER_PUBLISHED_ARTICLES, payload: articles });
const getUserUnpublishedArticles = articles => ({ type: GET_USER_UNPUBLISHED_ARTICLES, payload: articles });
const getArticle = article => ({ type: GET_ARTICLE, payload: article }); 

export const fetchPublishedArticles = (req = {}) => {
	return async dispatch => {
		try {
			const response = await http.GET('/articles/published', {});
			dispatch(getPublishedArticles(response));
			req.success();
		} catch(err) {
			console.error(err);
			req.error();
		}
	};
};

export const fetchUnpublishedArticles = (req = {}) => {
	return async dispatch => {
		try {
			const response = await http.GET('/articles/unpublished', {});
			dispatch(getUnpublishedArticles(response));
			req.success();
		} catch(err) {
			console.error(err);
			req.error();
		}
	};
};

export const fetchUserPublishedArticles = (req = {}) => {
	return async dispatch => {
		try {
			const response = await http.GET('/user/articles/published', {});
			dispatch(getUserPublishedArticles(response));
			req.success();
		} catch(err) {
			console.error(err);
			req.error();
		}
	};
};

export const fetchUserUnpublishedArticles = (req = {}) => {
	return async dispatch => {
		try {
			const response = await http.GET('/user/articles/unpublished', {});
			dispatch(getUserUnpublishedArticles(response));
			req.success();
		} catch(err) {
			console.error(err);
			req.error();
		}
	};
};

export const fetchArticle = (req = {}) => {
	return async dispatch => {
		try {
			const { id } = req.body;
			const response = await http.GET(`/articles/${id}`, {});
			dispatch(getArticle(response));
			req.success();
		} catch(err) {
			console.error(err);
			req.error();
		}
	};
};

export const createArticle = (req = {}) => {
	return async dispatch => {
		try {
			const response = await http.POST('/articles', req.body);
			dispatch(getArticle(response));
			req.success(response._id);
		} catch(err) {
			console.error(err);
			req.error();
		}
	};
};

export const editArticle = (req = {}) => {
	return async dispatch => {
		try {
			const { id, data } = req.body;
			const response = await http.PATCH(`/articles/${id}`, data);
			dispatch(getArticle(response));
			req.success();
		} catch(err) {
			console.error(err);
			req.error();
		}
	};
};
