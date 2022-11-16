import classes from './Wrapper.module.scss';
import { Offline } from 'react-detect-offline';
import { Layout, PageHeader, Alert } from 'antd';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import { useSelector } from 'react-redux';

const { Footer } = Layout;

export default function Wrapper() {
  const { error } = useSelector((state) => state.services);
  return (
    <Layout className={classes.wrapper}>
      <Offline>
        <Alert
          message="Warning"
          description="You have run out of internet."
          type="warning"
          banner
          showIcon
        />
      </Offline>
      <PageHeader ghost={false}>
        <Header />
      </PageHeader>
      <Outlet />
      <Footer className={classes.footer} />
    </Layout>
  );
}
