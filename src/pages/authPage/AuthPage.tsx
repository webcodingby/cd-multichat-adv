// import styles from './AuthPage.module.scss';
import Layout from './components/Layout/Layout';
import { FC, useEffect} from 'react'
import Form from './components/Form/Form';
import { useAppSelector } from '@hooks/useReduxTypedHook';
import { useNavigate } from 'react-router-dom';

const AuthPage:FC<any> = () => {
  const {token} = useAppSelector(s => s.mainSlice)
  const navigate = useNavigate()

  useEffect(() => {
    if(token) navigate('/chat?chatType=CHAT')
  }, [token])

  if(token) {
    return null
  }

  return (
    <Layout>
      <Form/>
    </Layout>
  )
}

export default AuthPage;