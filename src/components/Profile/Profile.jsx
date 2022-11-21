import classes from './Profile.module.scss';
import * as api from '../../api/api';
import { Link } from 'react-router-dom';
import { Button, Form, Input, Card, Result } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

export default function Profile() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state);
  const [isError, setIsError] = useState(false);
  const [subStatus, setSubStatus] = useState(false);
  const getUserInfo = () => {
    if (userData.user !== null) {
      return userData.user;
    }
    return null;
  };
  const [form] = Form.useForm();
  useEffect(() => {
    if (isError) {
      const errorkeys = Object.keys(isError);
      errorkeys.forEach((key) => {
        form.setFields([{ name: `${key}`, errors: [`${key} ${isError[key]}`] }]);
      });
    }
  }, [isError]);
  const onFinish = (values) => {
    setSubStatus(true);
    api
      .putCreatedUser(values.username, values.email, values.password, values.avatar, dispatch)
      .then((res) => {
        setSubStatus(false);
        return res !== true ? setIsError(res) : null;
      });
  };
  return userData.auth === false ? (
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
    <Card className={classes.signUp__form}>
      <h3>Edit Profile</h3>
      <Form
        name="normal_login"
        form={form}
        className="login-form"
        initialValues={{
          remember: true,
          username: getUserInfo().username,
          email: getUserInfo().email,
          password: '',
        }}
        onFinish={onFinish}
      >
        <label>
          Username
          <Form.Item
            name="username"
            rules={[
              {
                min: 3,
                max: 20,
                message: 'The input is not valid Username!',
              },
              {
                required: true,
                message: 'Please input your Username!',
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="some-username" autoComplete="on" />
          </Form.Item>
        </label>
        <label>
          Email
          <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your Email!',
              },
            ]}
          >
            <Input placeholder="email@example.ru" autoComplete="on" />
          </Form.Item>
        </label>
        <label>
          New Password
          <Form.Item
            name="password"
            rules={[
              {
                min: 6,
                max: 40,
                message:
                  'The input is not valid Password! The correct value is from 6 to 40 symbols',
              },
              {
                required: false,
                whitespace: true,
              },
            ]}
          >
            <Input type="password" placeholder="Password" autoComplete="on" />
          </Form.Item>
        </label>
        <label>
          New Avatar
          <Form.Item
            name="avatar"
            rules={[
              {
                type: 'url',
                message: 'The input is not valid URL-address!',
              },
              {
                required: false,
                whitespace: true,
              },
            ]}
          >
            <Input type="url" placeholder="URL-address" autoComplete="on" />
          </Form.Item>
        </label>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            className="login-form-button"
            loading={subStatus}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
