import http from '../../utils/http';

export const GET_PUBLISHED_ARTICLES = 'GET_PUBLISHED_ARTICLES';
export const GET_UNPUBLISHED_ARTICLES = 'GET_UNPUBLISHED_ARTICLES';
export const GET_USER_PUBLISHED_ARTICLES = 'GET_USER_PUBLISHED_ARTICLES';
export const GET_USER_UNPUBLISHED_ARTICLES = 'GET_USER_UNPUBLISHED_ARTICLES';
export const GET_ARTICLE = 'GET_ARTICLE';
export const SET_PUBLISHED_CURSOR = 'SET_PUBLISHED_CURSOR';

const getPublishedArticles = articles => ({ type: GET_PUBLISHED_ARTICLES, payload: articles });
const getUnpublishedArticles = articles => ({ type: GET_UNPUBLISHED_ARTICLES, payload: articles });
const getUserPublishedArticles = articles => ({ type: GET_USER_PUBLISHED_ARTICLES, payload: articles });
const getUserUnpublishedArticles = articles => ({ type: GET_USER_UNPUBLISHED_ARTICLES, payload: articles });
const getArticle = article => ({ type: GET_ARTICLE, payload: article });
const setPublishedCursor = cursor => ({ type: SET_PUBLISHED_CURSOR, payload: cursor });

export const fetchPublishedArticles = (req = {}) => {
	return async (dispatch, getState) => {
		try {
			let uri = '/articles/published';
			if (req.body) {
				const { cursor } = req.body;
				uri = `/articles/published?cursor=${cursor}`;
			}

			const { articlesReducer: { publishedArticles } } = getState();

			const response = await http.GET(uri, {});
			const { items, cursor } = response;

			dispatch(getPublishedArticles([...publishedArticles, ...items]));
			dispatch(setPublishedCursor(cursor));
			req.success(response.cursor);
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

const mapArticles = (isPublished, getState, dispatch, article) => {
	const { articlesReducer: { userPublishedArticles, userUnpublishedArticles } } = getState();

	if (isPublished) {
		userPublishedArticles.unshift(article);

		const i = userUnpublishedArticles.findIndex(a => a._id === article._id);

		if (i !== -1) {
			userUnpublishedArticles.splice(i, 1);
		}

		dispatch(getUserPublishedArticles(userPublishedArticles));
		dispatch(getUserUnpublishedArticles(userUnpublishedArticles));
	} else {
		userUnpublishedArticles.unshift(article);

		const i = userPublishedArticles.findIndex(a => a._id === article._id);

		if (i !== -1) {
			userPublishedArticles.splice(i, 1);
		}
		
		dispatch(getUserUnpublishedArticles(userUnpublishedArticles));
		dispatch(getUserPublishedArticles(userPublishedArticles));
	}
};

export const createArticle = (req = {}) => {
	return async (dispatch, getState) => {
		try {
			const response = await http.POST('/articles', req.body);
			dispatch(getArticle(response));

			mapArticles(req.body.isPublished, getState, dispatch, response);

			req.success(response._id);
		} catch(err) {
			console.error(err);
			req.error();
		}
	};
};

export const editArticle = (req = {}) => {
	return async (dispatch, getState) => {
		try {
			const { id, data } = req.body;
			const response = await http.PATCH(`/articles/${id}`, data);
			dispatch(getArticle(response));

			mapArticles(data.isPublished, getState, dispatch, response);

			req.success();
		} catch(err) {
			console.error(err);
			req.error();
		}
	};
};
