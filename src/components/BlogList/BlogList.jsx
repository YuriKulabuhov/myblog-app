import classes from './BlogList.module.scss';
import intlFormat from 'date-fns/intlFormat';
import { MagnifyingGlass } from 'react-loader-spinner';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as api from '../../api/api';
import { HeartTwoTone } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Pagination, Card, Avatar, Tag, Statistic } from 'antd';

const { Content } = Layout;

export default function BlogList() {
  const dispatch = useDispatch();
  const [offset, setOffset] = useState(0);
  const { articles, articlesCount, error } = useSelector((state) => state.services);
  useEffect(() => {
    dispatch(api.getRandomArticles(offset));
  }, [offset]);
  const changeMyHeart = (article) => {
    if (article.favorited) {
      api.deleteFavorited(article.slug, dispatch, true);
    } else api.postFavorited(article.slug, dispatch, true);
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
  return (
    <Content className={classes.main}>
      {!articles ? (
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
        articles.map((article) => (
          <Card
            key={uuidv4()}
            className={classes.main__article}
            title={
              <div className={classes.article_header}>
                <div className={classes.article_info}>
                  <div className={classes.article_headerer}>
                    <Link to={`/articles/${article.slug}`}>
                      <h3 className={classes.article_title}>{article.title}</h3>
                    </Link>
                    <Statistic
                      valueStyle={{ fontSize: '18px' }}
                      value={article.favoritesCount}
                      prefix={
                        <HeartTwoTone
                          onClick={() => {
                            changeMyHeart(article);
                          }}
                          twoToneColor={article.favorited ? '#EB0081' : '#C6C0C6'}
                          style={{ fontSize: '18px' }}
                        />
                      }
                    />
                  </div>
                  <div className={classes.article_tags}>
                    {article.tagList.toString().length !== 0 ? (
                      article.tagList.map((tag) => (
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
                    <span>{article.author.username}</span>
                    <span>{releaseData(article.updatedAt)}</span>
                  </div>
                  <Avatar alt="avatar" size={50} src={article.author.image} />
                </div>
              </div>
            }
            bodyStyle={{ padding: '0px 24px 24px 24px', display: 'flex', flexDirection: 'column' }}
          >
            <h4>{article.description}</h4>
          </Card>
        ))
      )}

      <Pagination
        showSizeChanger={false}
        pageSize={5}
        onChange={(page) => setOffset((page - 1) * 5)}
        defaultCurrent={1}
        total={articlesCount}
      />
    </Content>
  );
}
