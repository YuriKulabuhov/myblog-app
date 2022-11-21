import classes from './SignIn.module.scss';
import * as api from '../../../api/api';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Input, Card } from 'antd';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [subStatus, setSubStatus] = useState(false);
  const onFinish = (values) => {
    setSubStatus(true);
    api.postLogIn(values.email, values.password, dispatch).then((res) => {
      setSubStatus(false);
      return res ? navigate('/articles') : null;
    });
  };
  return (
    <Card className={classes.signIn__form}>
      <h3>Sign In</h3>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
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
            <Input placeholder="Email" autoComplete="on" />
          </Form.Item>
        </label>
        <label>
          Password
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input type="password" placeholder="Password" autoComplete="on" />
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
            Log in
          </Button>
          Or <Link to="/sign-up">register now!</Link>
        </Form.Item>
      </Form>
    </Card>
  );
}
