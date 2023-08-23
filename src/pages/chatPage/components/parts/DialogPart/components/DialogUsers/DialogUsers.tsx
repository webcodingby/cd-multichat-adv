import styles from './DialogUsers.module.scss';
import {Row, Col} from 'antd';
import { FC } from 'react'
import DialogUser from './components/DialogUser/DialogUser';
const DialogUsers:FC<any> = () => {

  return (
    <div className={styles.wrapper}>
      <Row gutter={[5,5]}>
        <Col span={12}><DialogUser/></Col>
        <Col span={12}><DialogUser/></Col>
      </Row>
    </div>
  )
}

export default DialogUsers;