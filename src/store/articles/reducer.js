import { GET_PUBLISHED_ARTICLES, GET_ARTICLE, GET_UNPUBLISHED_ARTICLES, GET_USER_PUBLISHED_ARTICLES, GET_USER_UNPUBLISHED_ARTICLES } from './actions';
import ArticleType from '../../models/article';

export type ArticlesReducerType = {
	publishedArticles: Array<ArticleType>;
	unpublishedArticles: Array<ArticleType>;
	userPublishedArticles: Array<ArticleType>;
	userUnpublishedArticles: Array<ArticleType>;
	article: ArticleType;
}

const initState = {
	publishedArticles: [],
	unpublishedArticles: [],
	userPublishedArticles: [],
	userUnpublishedArticles: [],
	article: {},
};

const articlesReducer = (state = initState, action) => {
	switch (action.type) {
	case GET_PUBLISHED_ARTICLES:
		return {
			...state,
			publishedArticles: action.payload,
		};
	case GET_UNPUBLISHED_ARTICLES:
		return {
			...state,
			unpublishedArticles: action.payload,
		};
	case GET_USER_PUBLISHED_ARTICLES:
		return {
			...state,
			userPublishedArticles: action.payload,
		};
	case GET_USER_UNPUBLISHED_ARTICLES:
		return {
			...state,
			userUnpublishedArticles: action.payload,
		};
	case GET_ARTICLE:
		return {
			...state,
			article: action.payload,
		};
	default:
		return state;
	}
};

export default articlesReducer;