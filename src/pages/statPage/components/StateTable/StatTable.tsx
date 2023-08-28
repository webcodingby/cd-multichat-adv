import getClassNames from '@utils/getClassNames';
import styles from './StatTable.module.scss';
import { FC, useState } from 'react'
import tableHead from './data/tableHead';
import {Row, Col} from 'antd';
import CardAnkets from '../cards/CardAnkets/CardAnkets';
import CardReps from '../cards/CardReps/CardReps';
import CardBalance from '../cards/CardBalance/CardBalance';
import CardAvg from '../cards/CardAvg/CardAvg';

const StatTable:FC<any> = () => {
  const [data, setData] = useState<any>()
  
  return (
    <div className={styles.wrapper}>
      <Row gutter={[12,12]}>
        <Col span={24}>
          <div className={styles.cards}>
            <Row gutter={[12,12]}>
              <Col span={6}>
                <CardAnkets/>
              </Col>
              <Col span={6}>
                <CardReps/>
              </Col>
              <Col span={6}>
                <CardBalance/>
              </Col>
              <Col span={6}>
                <CardAvg/>
              </Col>
            </Row>
          </div>
        </Col>
        <Col span={24}>
          <div className={styles.body}>
            <table className={getClassNames(['table'])}>
              <tr className={getClassNames(['table-row', 'table-headow'])}>
                {
                  tableHead?.map((i,index) => (
                    <th className={getClassNames(['table-item', 'table-head'])}>
                      {i?.value}
                    </th>
                  ))
                }
              </tr>
            </table>
          </div>
        </Col>
      </Row>
      <div className={styles.top}>
        
      </div>
      
    </div>
  )
}

export default StatTable;