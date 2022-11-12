import classes from './Header.module.scss';
import * as actions from '../../redux/actionCreators';
import icon from '../../media/avatarcus.ico';
import { Button, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function Header() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state);
  const getUserInfo = () => {
    if (userData.user !== null) {
      return userData.user;
    }
    return null;
  };
  return (
    <div className={classes.header}>
      <Link to="/">
        <h1 className={classes.titleApp}>MyBLOG App</h1>
      </Link>
      {!userData.auth ? (
        <div className={classes.signInBlock}>
          <Link to="sign-in">
            <Button className={classes.signIn} size="large" type="text">
              Sign In
            </Button>
          </Link>
          <Link to="sign-up">
            <Button className={classes.signUp} size="large" type="text">
              Sign Up
            </Button>
          </Link>
        </div>
      ) : (
        <div className={classes.logOutBlock}>
          <Link to="/new-article">
            <Button className={classes.createNewArticle} size="large" type="text">
              Create artile
            </Button>
          </Link>
          <Link to="profile">
            <h4 className={classes.loginNamed}>{getUserInfo().username}</h4>
            <Avatar size="large" src={getUserInfo() === null ? icon : getUserInfo().image} />
          </Link>
          <Link to="/">
            <Button
              className={classes.logOut}
              size="large"
              type="text"
              onClick={() => {
                dispatch(actions.postUserLogOut());
              }}
            >
              Log Out
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
