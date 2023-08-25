import styles from './Form.module.scss';
import {Row, Col} from 'antd'
import Input from '../../../../components/Input/Input';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, FC, useEffect, useState } from 'react'
import Button from '../../../../components/Button/Button';
import { useAuthMutation } from '../../../../store/slices/apiSlice/apiSlice';
import notify from '../../../../utils/notify';
import { useAppDispatch } from '@hooks/useReduxTypedHook';
import { main_addToken, main_deleteToken, main_updateAdminData } from '@store/slices/mainSlice/mainSlice';
import { Cookies } from 'typescript-cookie';
import { cookiesStorageKeys } from '@utils/storageKeys';

const {TOKEN, ADMIN} = cookiesStorageKeys;

const Form:FC<any> = () => {
  const dispatch = useAppDispatch()
  const [authResponse, authResponseResult] = useAuthMutation()
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [load, setLoad] = useState(false)
  const [error, setError] = useState(false)

  const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    authResponse({email, password})
  }

  useEffect(() => {
    setLoad(authResponseResult.isLoading)
    if(authResponseResult.isSuccess) {
      Cookies.set(TOKEN, authResponseResult.data.token, {
        expires: 30
      })
      Cookies.set(ADMIN, JSON.stringify({email, role: '', id: ''}))
      dispatch(main_updateAdminData({email, role: '', id: ''}))
      dispatch(main_addToken(authResponseResult.data.token))
      navigate('/chat?chatType=CHAT')
    }
    if(authResponseResult.isError) {
      setError(true)
      dispatch(main_deleteToken())
      notify('Неверные данные', 'ERROR')
    }
  }, [authResponseResult])

  return (
    <div className={styles.wrapper}>
      <form onSubmit={onSubmit} className={styles.form}>
        <Row gutter={[20,20]}>
          <Col span={24}>
            <h2 className={styles.title}>Вход</h2>
          </Col>
          <Col span={24}>
            <Input
              wrapperProps={{
                isError: error,
              }}
              inputProps={{
                placeholder: 'E-mail',
                type: 'email',
                onChange: (e:ChangeEvent<HTMLInputElement>) => {
                  setEmail(e.target.value)
                  setError(false)
                }
              }}
              />
          </Col>
          <Col span={24}>
            <Input
              wrapperProps={{
                isError: error,
              }}
              inputProps={{
                placeholder: 'Password',
                type: "password",
                onChange: (e:ChangeEvent<HTMLInputElement>) => {
                  setPassword(e.target.value)
                  setError(false)
                }
              }}
              />
          </Col>
          <Col span={24}>
            <div className={styles.action}>
              <Button
                type='submit'
                isLoading={load}
                disabled={!(email && password)}
                style={{minWidth: 200}}
                >Вход</Button>
            </div>
          </Col>
        </Row>
      </form>
    </div>
  )
}

export default Form;