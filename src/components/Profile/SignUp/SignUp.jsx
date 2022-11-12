import classes from './SignUp.module.scss';
import * as api from '../../../api/api';
import { Link } from 'react-router-dom';
import { Button, Form, Input, Card, Checkbox, Result } from 'antd';
import { useState } from 'react';

export default function SignUp() {
  const [successful, setSuccessful] = useState(false);
  const onFinish = (values) => {
    api.postNewUser(values.username, values.email, values.password);
    setSuccessful(true);
  };
  return successful ? (
    <Result
      status="success"
      title="Well done, and now log in!"
      extra={[
        <Link to="/sign-in" key="consoleMore">
          <Button type="primary" key="console" size="large">
            Log In
          </Button>
        </Link>,
      ]}
    />
  ) : (
    <Card className={classes.signUp__form}>
      <h3>Create new account</h3>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
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
          Password
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
                required: true,
                message: 'Please input your Password!',
                whitespace: true,
              },
            ]}
            hasFeedback
          >
            <Input type="password" placeholder="Password" autoComplete="on" />
          </Form.Item>
        </label>
        <label>
          Repeat Password
          <Form.Item
            name="repeatPassword"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please input your Password one more time!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('The two passwords that you entered do not match!')
                  );
                },
              }),
            ]}
          >
            <Input type="password" placeholder="Enter password one more time" autoComplete="on" />
          </Form.Item>
        </label>
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
            },
          ]}
        >
          <Checkbox>I agree to the processing of my personal information</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block className="login-form-button">
            Log in
          </Button>
          Already have an account?<Link to="/sign-in"> Sign In</Link>.
        </Form.Item>
      </Form>
    </Card>
  );
}
