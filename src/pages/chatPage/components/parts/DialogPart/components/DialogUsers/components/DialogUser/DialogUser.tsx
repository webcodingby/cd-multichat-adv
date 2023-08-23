import { FC } from 'react'
import styles from './DialogUser.module.scss';
import getClassNames from '../../../../../../../../../utils/getClassNames';
import {Row, Col} from 'antd';
import UserTitle from '../../../../../../../../../components/UserTitle/UserTitle';
import Avatar from '../../../../../../../../../components/Avatar/Avatar';

const DialogUser:FC<any> = () => {
  return (
    <div className={getClassNames([styles.wrapper, 'custom-scroll'])}>
      <Row gutter={[10,10]}>
        <Col span={24}>
          <div className={styles.top}>
            <div style={{marginRight: 10}}>
              <Avatar
                isOnline
                />
            </div>
            <UserTitle name='Username' age={20} state='California' country='USA'/>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default DialogUser;