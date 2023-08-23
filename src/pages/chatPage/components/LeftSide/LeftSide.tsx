import { FC, useState } from 'react'
import getClassNames from '../../../../utils/getClassNames';
import {Row, Col} from 'antd';
import Button from '../../../../components/Button/Button';
import LimitsPart from '../parts/LimitsPart/LimitsPart';



const LeftSide:FC<any> = () => {
  const [activeTab, setActiveTab] = useState<'1' | '2'>('1')


  return (
    <div className={getClassNames(['panel', 'panel-with-padding'])}>
      <Row gutter={[10,10]}>
        <Col span={24}>
          <Row gutter={[10,10]}>
            <Col span={12}>
              <Button 
                variant={activeTab === '1' ? 'default' : 'dark'}
                onClick={() => setActiveTab('1')}
                isFill>
                Лимиты</Button>
            </Col>
            <Col span={12}>
              <Button 
                variant={activeTab === '2' ? 'default' : 'dark'}
                onClick={() => setActiveTab('2')}
                isFill>
                Новые сообщения</Button>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <LimitsPart/>
        </Col>
      </Row>
    </div>
  )
}

export default LeftSide;