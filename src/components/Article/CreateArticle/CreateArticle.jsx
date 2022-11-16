import classes from './CreateArticle.module.scss';
import * as api from '../../../api/api';
import { useNavigate, Link } from 'react-router-dom';

import { Button, Form, Input, Card, Space, Result } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

export default function CreateArticle() {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state);
  const onFinish = (values) => {
    const tagsList = values.tags || [];
    api.postNewArticle(values.title, values.description, values.body, tagsList);
    navigate('/articles');
  };
  return !userData.auth ? (
    <Result
      title="You are denied access, go through authorization!"
      extra={[
        <Link to="/sign-in" key="consoleMoreNone">
          <Button type="primary" key="consoleMore" size="large">
            Sign In
          </Button>
        </Link>,
      ]}
    />
  ) : (
    <Card className={classes.createArticle__form}>
      <h3>Create new article</h3>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
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
