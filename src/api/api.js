import axios from 'axios';
import * as actions from '../redux/actionCreators';
import { message } from 'antd';

const infoStatus = (status) => {
  message.info(status);
};
export const getRandomArticles = (valuePage) => {
  const token = localStorage.getItem('token');
  return function (dispatch) {
    return axios
      .get(
        'https://blog.kata.academy/api/articles',
        { params: { limit: 5, offset: valuePage } },
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .then((res) => {
        dispatch(actions.getAllArticles(res.data));
      })
      .catch((error) => dispatch(actions.getError(error.message)));
  };
};
export const getArticlesItem = (slug) => {
  const token = localStorage.getItem('token');
  return function (dispatch) {
    return axios
      .get(`https://blog.kata.academy/api/articles/${slug}`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        dispatch(actions.getCurrentArticle(res.data));
      })
      .catch((er) => dispatch(actions.getError(er.message)));
  };
};
export const postFavorited = (slug) => {
  const token = localStorage.getItem('token');
  return axios
    .post(
      `https://blog.kata.academy/api/articles/${slug}/favorite`,
      {},
      {
        headers: { Authorization: `Token ${token}` },
      }
    )
    .then((res) => {
      infoStatus(`Favorited: ${res.statusText}`);
    })
    .catch((er) => infoStatus(`An error has occurred. ${er.message}`));
};
export const deleteFavorited = (slug) => {
  const token = localStorage.getItem('token');
  return axios
    .delete(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
      headers: { Authorization: `Token ${token}` },
    })
    .then((res) => {
      infoStatus(`Unfavorited: ${res.statusText}`);
    })
    .catch((er) => infoStatus(`An error has occurred. ${er.message}`));
};
export const postNewUser = (usernameValue, emailValue, passwordValue) => {
  return axios
    .post(`https://blog.kata.academy/api/users`, {
      user: {
        username: usernameValue,
        email: emailValue,
        password: passwordValue,
      },
    })
    .then((res) => {
      infoStatus(res.statusText);
    })
    .catch((er) => infoStatus(`An error has occurred. ${er.message}`));
};
export const postLogIn = (emailValue, passwordValue, dispatch) => {
  return axios
    .post(`https://blog.kata.academy/api/users/login`, {
      user: {
        email: emailValue,
        password: passwordValue,
      },
    })
    .then((res) => {
      dispatch(actions.postUserLogIn(res.data.user));
      localStorage.setItem('token', res.data.user.token);
    })
    .catch((er) => infoStatus(`An error has occurred. ${er.message}`));
};
export const putCreatedUser = (usernameValue, emailValue, passwordValue, imageValue, dispatch) => {
  const token = localStorage.getItem('token');
  return axios
    .put(
      `https://blog.kata.academy/api/user`,
      {
        user: {
          email: emailValue,
          password: passwordValue,
          username: usernameValue,
          image: imageValue,
        },
      },
      {
        headers: { Authorization: `Token ${token}` },
      }
    )
    .then((res) => {
      dispatch(actions.postUserLogIn(res.data.user));
      localStorage.token = res.data.user.token;
    })
    .catch((er) => infoStatus(`An error has occurred. ${er.message}`));
};
export const putEditArticle = (slug, titleValue, descriptionValue, bodyValue, tagsListValue) => {
  const token = localStorage.getItem('token');
  return axios
    .put(
      `https://blog.kata.academy/api/articles/${slug}`,
      {
        article: {
          title: titleValue,
          description: descriptionValue,
          body: bodyValue,
          tagList: tagsListValue,
        },
      },
      {
        headers: { Authorization: `Token ${token}` },
      }
    )
    .then((res) => {
      infoStatus(`Edit status:${res.statusText}`);
    })
    .catch((er) => infoStatus(`An error has occurred. ${er.message}`));
};
export const deleteArticlesItem = (slug) => {
  const token = localStorage.getItem('token');
  return axios
    .delete(`https://blog.kata.academy/api/articles/${slug}`, {
      headers: { Authorization: `Token ${token}` },
    })
    .then((res) => {
      infoStatus('Aricle deleted');
    })
    .catch((er) => infoStatus(`An error has occurred. ${er.message}`));
};
export const getUserData = (dispatch) => {
  const token = localStorage.getItem('token');
  return axios
    .get(`https://blog.kata.academy/api/user`, {
      headers: { Authorization: `Token ${token}` },
    })
    .then((res) => {
      dispatch(actions.postUserLogIn(res.data.user));
    })
    .catch((er) => {
      localStorage.clear();
      infoStatus(`You're log out. ${er.message}`);
    });
};
export const postNewArticle = (titleValue, descriptionValue, bodyValue, tagsListValue) => {
  const token = localStorage.getItem('token');
  return axios
    .post(
      `https://blog.kata.academy/api/articles`,
      {
        article: {
          title: titleValue,
          description: descriptionValue,
          body: bodyValue,
          tagList: tagsListValue,
        },
      },
      {
        headers: { Authorization: `Token ${token}` },
      }
    )
    .then((res) => {
      infoStatus(res.statusText);
    })
    .catch((er) => infoStatus(`An error has occurred. ${er.message}`));
};
