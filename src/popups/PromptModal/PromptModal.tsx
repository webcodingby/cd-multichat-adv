import { FC } from 'react'
import {Modal, ModalFuncProps, Row, Col} from 'antd'
import getClassNames from '@utils/getClassNames'
import styles from './PromptModa.module.scss';
import Button from '@components/Button/Button';
import I from './types';

const PromptModal:FC<I> = (props) => {
  const {data, ...otherProps} = props
  
  return (
    <Modal
      {...otherProps}
      className={getClassNames([styles.wrapper,'modal'])}
      >
      <Row gutter={[20,20]}>
        <Col span={24}>
          <h3>Вы уверены что хотите выйти?</h3>
        </Col>
        <Col span={24}>
          <div className={styles.action}>
            <Row gutter={[10,10]}>
              <Col span={12}>
                <Button>
                  Выйти
                </Button>
              </Col>
              <Col span={12}>
                <Button variant={'danger'}>
                  Отмена
                </Button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Modal>
  )
}

export default PromptModal;