import { FC } from 'react'
import LineChart from '../LineChart/LineChart';
import {Row, Col} from 'antd';
import styles from './StatChart.module.scss';
import LineDg from '../LineDg/LineDg';


const StatChart:FC<any> = () => {
  return (
    <div className={styles.wrapper}>
      <Row gutter={[12,12]}>
        <Col span={24}>
          <h1>Cards</h1>
        </Col>
        <Col span={24}>
          <div className={styles.body}>
            <div className={styles.chart}>
              <LineChart
                title='Заработок относительно прошлого месяца'
                />
            </div>
            <div className={styles.data}>
              <LineDg/>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default StatChart;