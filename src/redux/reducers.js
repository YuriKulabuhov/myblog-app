import { combineReducers } from 'redux';

const initialState = {
  articles: null,
  currentArticle: null,
  offset: 0,
};
function serviceReducer(
  state = initialState,
  { type, articles, articlesCount, article, offsetCount } = {}
) {
  switch (type) {
    case 'GET_ALL_ARTICLES': {
      return {
        ...state,
        articles,
        articlesCount,
        currentArticle: null,
      };
    }
    case 'PUT_OFFSET': {
      return { ...state, offset: offsetCount };
    }
    case 'GET_CURRENT_ARTICLE': {
      return { ...state, currentArticle: article };
    }
    case 'FAVORITED_CURRENT_ARTICLE': {
      return { ...state, currentArticle: article };
    }
    case 'FAVORITE_IN_ARTICLES': {
      const result = state.articles.map((ar) => (ar.slug === article.slug ? article : ar));
      return { ...state, articles: result };
    }
    default:
      return state;
  }
}
const userState = {
  auth: false,
  user: null,
};
function userReducer(state = userState, { type, user, createdUser } = {}) {
  switch (type) {
    case 'POST_AUTH':
      return { user, auth: true };
    case 'POST_CREATED_USER':
      return { ...state, user: createdUser };
    case 'POST_LOGIN_OUT':
      localStorage.clear();
      return { user: null, auth: false };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  services: serviceReducer,
  userData: userReducer,
});
export default rootReducer;
