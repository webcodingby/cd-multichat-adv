import styles from './AuthPage.module.scss';
import Layout from './components/Layout/Layout';
import { FC } from 'react'
import Form from './components/Form/Form';

const AuthPage:FC<any> = () => {
  return (
    <Layout>
      <Form/>
    </Layout>
  )
}

export default AuthPage;