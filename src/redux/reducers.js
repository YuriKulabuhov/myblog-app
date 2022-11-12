import { combineReducers } from 'redux';

const initialState = {
  currentArticle: null,
  error: { count: 0, message: '' },
};
function serviceReducer(
  state = initialState,
  { type, articles, articlesCount, article, errorMessage } = {}
) {
  switch (type) {
    case 'GET_ERROR':
      return { ...state, error: { count: state.error.count + 1, message: errorMessage } };
    case 'GET_ALL_ARTICLES': {
      return {
        ...state,
        articles,
        articlesCount,
        currentArticle: null,
        error: { count: 0, message: '' },
      };
    }
    case 'GET_CURRENT_ARTICLE': {
      return { ...state, currentArticle: article };
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
