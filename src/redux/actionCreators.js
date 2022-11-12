// optionsArticlesActions
export const getAllArticles = ({ articles, articlesCount }) => ({
  type: 'GET_ALL_ARTICLES',
  articles,
  articlesCount,
});
export const getCurrentArticle = ({ article }) => ({
  type: 'GET_CURRENT_ARTICLE',
  article,
});
export const getError = (errorMessage) => ({
  type: 'GET_ERROR',
  errorMessage,
});
// optionsUsersActions
export const postUserLogIn = (user) => ({
  type: 'POST_AUTH',
  user,
});
export const postUserLogOut = () => ({
  type: 'POST_LOGIN_OUT',
});
export const postCreatedUser = (createdUser) => ({
  type: 'POST_CREATED_USER',
  createdUser,
});
