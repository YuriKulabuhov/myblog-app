import { Routes, Route } from 'react-router-dom';
import BlogList from './components/BlogList/BlogList';
import SingIn from './components/Profile/SignIn/SignIn';
import SingUp from './components/Profile/SignUp/SignUp';
import Profile from './components/Profile/Profile';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import Article from './components/Article/Article';
import Wrapper from './components/Wrapper/Wrapper';
import { useEffect } from 'react';
import * as api from './api/api';
import { useDispatch } from 'react-redux';
import CreateArticle from './components/Article/CreateArticle/CreateArticle';
import EditArticle from './components/Article/EditArticle/EditArticle';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      api.getUserData(dispatch);
    }
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Wrapper />}>
        <Route index element={<BlogList />} />
        <Route path="articles" element={<BlogList />} />
        <Route path="articles/:slug" element={<Article />} />
        <Route path="articles/:slug/edit" element={<EditArticle />} />
        <Route path="new-article" element={<CreateArticle />} />
        <Route path="sign-in" element={<SingIn />} />
        <Route path="sign-up" element={<SingUp />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
