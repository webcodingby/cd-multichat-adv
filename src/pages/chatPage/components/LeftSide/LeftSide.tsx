import { FC, useState } from 'react'
import getClassNames from '../../../../utils/getClassNames';
import {Row, Col} from 'antd';
import Button from '../../../../components/Button/Button';
import LimitsPart from '../parts/LimitsPart/LimitsPart';
import InboxPart from '../parts/InboxPart/InboxPart';
import { useAppSelector } from '@hooks/useReduxTypedHook';



const LeftSide:FC<any> = () => {
  const {chatData} = useAppSelector(s => s.mainSlice)
  const {limits} = chatData || {}
  const [activeTab, setActiveTab] = useState<'1' | '2'>('2')

  return (
    <div className={getClassNames(['panel', 'panel-with-padding'])}>
      <Row gutter={[10,10]}>
        <Col span={24}>
          <Row gutter={[10,10]}>
            <Col span={12}>
              <Button 
                variant={activeTab === '2' ? 'default' : 'dark'}
                onClick={() => setActiveTab('2')}
                isFill>
                Новые сообщения</Button>
            </Col>
            <Col span={12}>
              <Button 
                variant={activeTab === '1' ? 'default' : 'dark'}
                onClick={() => setActiveTab('1')}
                isFill
                indicator={limits?.length}
                >
                Лимиты</Button>
            </Col>
            
          </Row>
        </Col>
        <Col span={24}>
          <LimitsPart 
            isActive={activeTab === '1'}/>
          <InboxPart 
            isActive={activeTab === '2'}/>
        </Col>
      </Row>
    </div>
  )
}

export default LeftSide;