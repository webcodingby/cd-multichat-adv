import styles from './LineDg.module.scss';
import { FC } from 'react'
import {Row, Col} from 'antd';

interface I {
  title?: string,
  list?: any[]
}

const LineDg:FC<I> = ({
  title = 'Прибыль по типу действия в этом месяце'
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{title}</div>
      <div className={styles.body}>
        <Row gutter={[15,15]}>
          <Col span={24}>
            <div className={styles.item}>
              <div className={styles.info}>
                <div className={styles.label}>Тип заработка</div>
                <div className={styles.value}>83%</div>
              </div>
              <div className={styles.line}><div className={styles.bar}></div></div>
            </div>
          </Col>
          <Col span={24}>
            <div className={styles.item}>
              <div className={styles.info}>
                <div className={styles.label}>Тип заработка</div>
                <div className={styles.value}>50%</div>
              </div>
              <div className={styles.line}><div className={styles.bar} style={{width: '50%'}}></div></div>
            </div>
          </Col>
        </Row>
        
      </div>
    </div>
  )
}

export default LineDg;