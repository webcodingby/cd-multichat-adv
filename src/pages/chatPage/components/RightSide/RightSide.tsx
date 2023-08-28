import { FC } from 'react'
import getClassNames from '../../../../utils/getClassNames';
import {Row, Col} from 'antd';
import Button from '../../../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import ChatsPart from '../parts/ChatsPart/ChatsPart';
import { useAppDispatch, useAppSelector } from '@hooks/useReduxTypedHook';
import { main_updateChatType, main_updateCurrentChatId } from '@store/slices/mainSlice/mainSlice';
import MailsPart from '../parts/ChatsPart/MailsPart';


const RightSide:FC<any> = () => {
  const dispatch = useAppDispatch()
  const {chatData} = useAppSelector(s => s.mainSlice)
  const {chatType} = chatData || {}
  const navigate = useNavigate()

  return (
    <div className={getClassNames(['panel', 'panel-with-padding'])}>
      <Row gutter={[10,10]}>
        <Col span={24}>
          <Row gutter={[10,10]}>
            <Col span={12}>
              <Button 
                
                onClick={() => {
                  navigate('/chat?chatType=CHAT')
                  dispatch(main_updateChatType('CHAT'))
                  dispatch(main_updateCurrentChatId(null))
                }}
                variant={chatType === 'CHAT' ? 'default' : 'dark'}
                isFill>Чат</Button>
            </Col>
            <Col span={12}>
              <Button 
                onClick={() => {
                  navigate('/chat?chatType=MAIL')
                  dispatch(main_updateChatType('MAIL'))
                  dispatch(main_updateCurrentChatId(null))
                }}
                variant={chatType === 'MAIL' ? 'default' : 'dark'}
                isFill>Письма</Button>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          {
            chatType === 'CHAT' && (
              <ChatsPart/>
            )
          }
          {
            chatType === 'MAIL' && (
              <MailsPart/>
            )
          }
        </Col>
      </Row>
    </div>
  )
}

export default RightSide;