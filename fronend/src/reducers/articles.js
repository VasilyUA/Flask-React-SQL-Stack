export const GET_LIST = 'GET_LIST';
export const GET_ARTICLE = 'GET_ARTICLE';
export const ADD_ARTICLE = 'ADD_ARTICLE';
export const REMOVE_ARTICLE = 'REMOVE_ARTICLE';
export const UPDATE_ARTICLE = 'UPDATE_ARTICLE';
export const CLOSE_ARTICLE = 'CLOSE_ARTICLE';

export const initialState = {
	articles: [],
	oneArticle: {},
	isLoading: false,
	isArticles: false,
};

export function reducer(state, action) {
	switch (action.type) {
		case GET_LIST:
			return { ...state, isLoading: false, articles: action.payload };
		case GET_ARTICLE:
			return { ...state, isLoading: false, isArticles: true, oneArticle: action.payload };
		case ADD_ARTICLE:
			return { ...state, isLoading: false, articles: [...state.articles, action.payload] };
		case REMOVE_ARTICLE:
			return { ...state, isLoading: false, articles: state.articles.filter((element) => element.id !== action.payload) };
		case CLOSE_ARTICLE:
			return { ...state, oneArticle: {}, isArticles: false };
		case UPDATE_ARTICLE:
			const isLargeNumber = state.articles.findIndex((element) => element.id === action.payload.id);
			state.articles[isLargeNumber] = action.payload.card;
			return { ...state, isLoading: false, articles: state.articles };
		default:
			throw new Error();
	}
}
