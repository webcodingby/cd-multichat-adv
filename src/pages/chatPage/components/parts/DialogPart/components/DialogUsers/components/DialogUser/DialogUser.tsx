import { FC, useEffect, useState } from 'react'
import styles from './DialogUser.module.scss';
import getClassNames from '@utils/getClassNames';
import {Row, Col} from 'antd';
import UserTitle from '@components/UserTitle/UserTitle';
import Avatar from '@components/Avatar/Avatar';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { useAppSelector, useAppDispatch } from '@hooks/useReduxTypedHook';
import { main_updateCurrentUser } from '@store/slices/mainSlice/mainSlice';

interface I {
  data?: any,
  type?: 'man' | 'girl'
}

const DialogUser:FC<I> = ({
  data,
  type
}) => {
  const dispatch = useAppDispatch()
  const {
    id,
    about_self = '',
    ace_count,
    user_thumbnail_url,
    state,
    email,
    age,
    anket_status,
    count_shop_watches,
    cooldown,
    country,
    email_verified_at,
    is_blocked,
    is_confirmed_user,
    is_donate,
    is_email_verified,
    is_premium,
    name,
    last_online,
    online,
    timezone,
    credits,
    prompt_target_id
  } = data || {}
  const {chatData} = useAppSelector(s => s.mainSlice)
  const {dialogUsers} = chatData || {}
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(false)
  }, [dialogUsers])


  if(type === 'man') {
    return (
      <div className={getClassNames([styles.wrapper, 'custom-scroll'])}>
        <Row gutter={[10,10]}>
          <Col span={24}>
            <div className={styles.top}>
              <div style={{marginRight: 10}}>
                <Avatar
                  onClick={() => dispatch(main_updateCurrentUser(id))}
                  image={user_thumbnail_url}
                  isOnline={online === 1}
                  />
              </div>
              <UserTitle name={name} age={age} state={state} country={country}/>
            </div>
          </Col>
          <Col span={24}>
            <div className={styles.body}>
              <Row gutter={[5,5]}>
                <Col span={12}>
                  <Row gutter={[5,5]}>
                    <Col span={24}>id: <span>{id}</span></Col>
                    <Col span={24}>Цель: <span>{prompt_target_id}</span></Col>
                    <Col span={24}>Фото: </Col>    
                  </Row>
                </Col>
                <Col span={12}>
                  <Row gutter={[5,5]}>
                    <Col span={24}>Кредиты: <span>{credits}</span></Col>
                    <Col span={24}>Чаты: </Col>
                    <Col span={24}>Письма: </Col>
                  </Row>
                </Col>
                {
                  about_self && (
                    <Col span={24}>
                      <div className={styles.descr}>
                        {
                          !isOpen ? (
                            about_self?.length > 38 ? about_self?.slice(0,35) + '...' : about_self
                          ) : (
                            about_self
                          )
                        }
                        {
                          about_self?.length > 38 && (
                            <button className={styles.toggle} onClick={() => setIsOpen(s => !s)}>
                              {isOpen ? <BiChevronUp/> : <BiChevronDown/>}
                            </button>
                          )
                        }
                      </div>
                    </Col>
                  )
                }
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
  if(type === 'girl') {
    return (
      <div className={getClassNames([styles.wrapper, 'custom-scroll'])}>
        <Row gutter={[10,10]}>
          <Col span={24}>
            <div className={styles.top}>
              <div style={{marginRight: 10}}>
                <Avatar
                  onClick={() => dispatch(main_updateCurrentUser(id))}
                  image={user_thumbnail_url}
                  isOnline={online === 1}
                  />
              </div>
              <UserTitle name={name} age={age} state={state} country={country}/>
            </div>
          </Col>
          <Col span={24}>
            <div className={styles.body}>
              <Row gutter={[5,5]}>
                <Col span={12}>
                  <Row gutter={[5,5]}>
                    <Col span={24}>id: <span>{id}</span></Col>
                    <Col span={24}>Цель: <span>{prompt_target_id}</span></Col>
                    <Col span={24}>Фото: </Col>
                  </Row>
                </Col>
                <Col span={12}>
                  <Row gutter={[5,5]}>
                    <Col span={24}>Обычные:</Col>
                    <Col span={24}>Видео:</Col>
                    <Col span={24}>18+:</Col>
                  </Row>
                </Col>
                {
                  about_self && (
                    <Col span={24}>
                      <div className={styles.descr}>
                        {
                          !isOpen ? (
                            about_self?.length > 38 ? about_self?.slice(0,35) + '...' : about_self
                          ) : (
                            about_self
                          )
                        }
                        {
                          about_self?.length > 38 && (
                            <button className={styles.toggle} onClick={() => setIsOpen(s => !s)}>
                              {isOpen ? <BiChevronUp/> : <BiChevronDown/>}
                            </button>
                          )
                        }
                      </div>
                    </Col>
                  )
                }
                
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
  return null
  
}

export default DialogUser;