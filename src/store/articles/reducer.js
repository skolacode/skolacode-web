import { GET_PUBLISHED_ARTICLES } from './actions';


type ArticlesType = {
	title: string;
	description: string;
	headerImgUrl: string;
	content: string;
}

export type ArticlesReducerType = {
	articles: Array<ArticlesType>;
}

const initState = {
	articles: [],
};

const articlesReducer = (state = initState, action) => {
	switch (action.type) {
	case GET_PUBLISHED_ARTICLES:
		return {
			...state,
			articles: action.payload,
		};
	default:
		return state;
	}
};

export default articlesReducer;