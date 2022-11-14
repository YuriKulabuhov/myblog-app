import classes from './Article.module.scss';
import * as api from '../../api/api';
import { v4 as uuidv4 } from 'uuid';
import ReactMarkdown from 'react-markdown';
import intlFormat from 'date-fns/intlFormat';
import { useDispatch, useSelector } from 'react-redux';
import { MagnifyingGlass } from 'react-loader-spinner';
import { ExclamationCircleOutlined, HeartTwoTone } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Card, Avatar, Tag, Statistic, Button, Modal } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';

const { confirm } = Modal;

export default function Article() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentArticle, error } = useSelector((state) => state.services);
  const { userData } = useSelector((state) => state);
  useEffect(() => {
    dispatch(api.getArticlesItem(slug));
  }, [slug]);

  const showConfirm = () => {
    confirm({
      title: 'Are you sure you want to delete this article?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        api.deleteArticlesItem(slug);
        navigate('/articles');
      },
    });
  };
  const changeMyHeart = (article) => {
    if (article.favorited) {
      api.deleteFavorited(article.slug, dispatch, false);
    } else api.postFavorited(article.slug, dispatch, false);
  };
  const releaseData = (releaseDate = '') => {
    if (releaseDate !== '') {
      const result = intlFormat(
        new Date(Date.parse(releaseDate)),
        {
          day: 'numeric',
          year: 'numeric',
          month: 'long',
        },
        {
          locale: 'en-EN',
        }
      );
      return result;
    }
    return 'Secret Date';
  };
  return currentArticle === null ? (
    <MagnifyingGlass
      visible
      height="180"
      width="180"
      ariaLabel="MagnifyingGlass-loading"
      wrapperStyle={{ margin: '10% auto' }}
      wrapperClass="MagnifyingGlass-wrapper"
      glassColor="#11db11"
      color="#000000"
    />
  ) : (
    <Card
      className={classes.main__article}
      title={
        <div className={classes.article_header}>
          <div className={classes.article_info}>
            <div className={classes.article_headerer}>
              <h3 className={classes.article_title}>{currentArticle.title}</h3>
              <Statistic
                valueStyle={{ fontSize: '18px' }}
                value={currentArticle.favoritesCount}
                prefix={
                  <HeartTwoTone
                    onClick={() => {
                      changeMyHeart(currentArticle);
                    }}
                    twoToneColor={currentArticle.favorited ? '#EB0081' : '#C6C0C6'}
                    style={{ fontSize: '18px' }}
                  />
                }
              />
            </div>
            <div className={classes.article_tags}>
              {currentArticle.tagList.toString().length !== 0 ? (
                currentArticle.tagList.map((tag) => (
                  <Tag key={uuidv4()} className={classes.article_tag}>
                    {tag}
                  </Tag>
                ))
              ) : (
                <Tag className={classes.article_tag}>None tags</Tag>
              )}
            </div>
          </div>
          <div className={classes.article_autor}>
            <div className={classes.article_autorInfo}>
              <span>{currentArticle.author.username}</span>
              <span> {releaseData(currentArticle.updatedAt)}</span>
            </div>
            <Avatar alt="avatar" size={50} src={currentArticle.author.image} />
          </div>
        </div>
      }
      bodyStyle={{ padding: '0px 24px 24px 24px', display: 'flex', flexDirection: 'column' }}
    >
      <div className={classes.wrapper}>
        <div>
          <h4 className={classes.main__article_description}>{currentArticle.description}</h4>
          <span className={classes.main__article_body}>
            <ReactMarkdown>{currentArticle.body}</ReactMarkdown>
          </span>
        </div>
        {userData.user !== null && userData.user.username === currentArticle.author.username && (
          <div className={classes.signInBlock}>
            <Button className={classes.signIn} onClick={showConfirm} type="text">
              Delete
            </Button>
            <Link
              to="edit"
              state={{
                title: currentArticle.title,
                description: currentArticle.description,
                text: currentArticle.body,
                tagList: currentArticle.tagList,
              }}
            >
              <Button className={classes.signUp} type="text">
                Edit
              </Button>
            </Link>
          </div>
        )}
      </div>
    </Card>
  );
}
