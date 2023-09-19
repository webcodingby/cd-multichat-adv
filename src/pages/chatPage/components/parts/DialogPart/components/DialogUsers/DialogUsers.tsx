import styles from './DialogUsers.module.scss';
import {Row, Col} from 'antd';
import { FC } from 'react'
import DialogUser from './components/DialogUser/DialogUser';
import { useAppSelector } from '@hooks/useReduxTypedHook';


const DialogUsers:FC<any> = () => {
  const {chatData: {dialogUsers}} = useAppSelector(s => s.mainSlice)
  const {man, girl} = dialogUsers || {}

  return (
    <div className={styles.wrapper}>
      <Row gutter={[5,5]}>
        <Col span={12}>
          <DialogUser
            data={man}
            type='man'
            />
        </Col>
        <Col span={12}>
          <DialogUser
            data={girl}
            type='girl'
            />
        </Col>
      </Row>
    </div>
  )
}

export default DialogUsers;