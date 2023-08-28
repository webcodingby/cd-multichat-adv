import { FC } from 'react'
import styles from './DialogUser.module.scss';
import getClassNames from '../../../../../../../../../utils/getClassNames';
import {Row, Col} from 'antd';
import UserTitle from '../../../../../../../../../components/UserTitle/UserTitle';
import Avatar from '../../../../../../../../../components/Avatar/Avatar';

interface I {
  data?: any,
  type?: 'man' | 'girl'
}

const DialogUser:FC<I> = ({
  data,
  type
}) => {
  const {
    id,
    about_self,
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
  } = data || {}
  if(type === 'man') {
    return (
      <div className={getClassNames([styles.wrapper, 'custom-scroll'])}>
        <Row gutter={[10,10]}>
          <Col span={24}>
            <div className={styles.top}>
              <div style={{marginRight: 10}}>
                <Avatar
                  image={user_thumbnail_url}
                  isOnline={online === 1}
                  />
              </div>
              <UserTitle name={name} age={age} state={state} country={country}/>
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
                  image={user_thumbnail_url}
                  isOnline={online === 1}
                  />
              </div>
              <UserTitle name={name} age={age} state={state} country={country}/>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
  return null
  
}

export default DialogUser;