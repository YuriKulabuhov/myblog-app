import classes from './EditArticle.module.scss';
import * as api from '../../../api/api';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Input, Card, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';

export default function EditArticle() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();
  const { currentArticle } = useSelector((state) => state.services);
  useEffect(() => {
    dispatch(api.getArticlesItem(slug));
  }, [slug]);
  const onFinish = (values) => {
    const tagsList = values.tags || [];
    api.putEditArticle(slug, values.title, values.description, values.body, tagsList);
    navigate('/articles');
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
    <Card className={classes.createArticle__form}>
      <h3>Edit article</h3>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
          title: currentArticle.title,
          description: currentArticle.description,
          body: currentArticle.body,
          tags: currentArticle.tagList,
        }}
        onFinish={onFinish}
      >
        <label>
          Title
          <Form.Item
            name="title"
            rules={[
              {
                required: true,
                message: 'Please input your Title!',
              },
            ]}
          >
            <Input placeholder="Title" autoComplete="on" />
          </Form.Item>
        </label>
        <label>
          Shot description
          <Form.Item
            name="description"
            rules={[
              {
                required: true,
                message: 'Please input your description!',
              },
            ]}
          >
            <Input placeholder="Some shot description..." autoComplete="on" />
          </Form.Item>
        </label>
        <label>
          Text
          <Form.Item
            name="body"
            rules={[
              {
                required: true,
                message: 'Please input your Text!',
              },
            ]}
          >
            <Input.TextArea placeholder="General text" autoComplete="on" />
          </Form.Item>
        </label>
        <label>
          Tags
          <Form.List name="tags">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{
                      display: 'flex',
                    }}
                    align="baseline"
                  >
                    <Form.Item {...restField} name={[name]} key={key}>
                      <Input placeholder="Enter tag..." />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button type="ghost" onClick={() => add()}>
                    <PlusOutlined />
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </label>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Send
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
