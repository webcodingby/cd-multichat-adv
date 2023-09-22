import { FC } from 'react'
import getClassNames from '../../../../utils/getClassNames';
import {Row, Col} from 'antd';
import Button from '../../../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import ChatsPart from '../parts/ChatsPart/ChatsPart';
import { useAppDispatch, useAppSelector } from '@hooks/useReduxTypedHook';
import { main_updateChatType, main_updateCurrentChatId, main_updateChatFilter } from '@store/slices/mainSlice/mainSlice';
import MailsPart from '../parts/ChatsPart/MailsPart';
import Input from '@components/Input/Input';
import styles from './RightSide.module.scss';

const RightSide:FC<any> = () => {
  const dispatch = useAppDispatch()
  const {chatData, chatFilter} = useAppSelector(s => s.mainSlice)
  const {chatType} = chatData || {}
  const navigate = useNavigate()

  const onFilterChange = (type: 'online' | 'premium' | 'payed' | 'super_payed' | '') => {
    if(chatFilter === type) {
      dispatch(main_updateChatFilter(''))
    } else {
      dispatch(main_updateChatFilter(type))
    }
  }

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
        {/* <Col span={24}>
          <Input
            inputProps={{
              placeholder: 'Поиск...',
              style: {
                backgroundColor: 'var(--blue_4)'
              }
            }}
            />
        </Col> */}
        <Col span={24}>
          <div className={styles.filter}>
            <button 
              onClick={() => onFilterChange('online')}
              className={getClassNames([styles.item, styles.online, chatFilter === 'online' && styles.active])}>O</button>
            <button 
              onClick={() => onFilterChange('premium')}
              className={getClassNames([styles.item, styles.premium, chatFilter === 'premium' && styles.active])}>P</button>
            <button 
              onClick={() => onFilterChange('payed')}
              className={getClassNames([styles.item, styles.payed, chatFilter === 'payed' && styles.active])}>PA</button>
            <button 
              onClick={() => onFilterChange('super_payed')}
              className={getClassNames([styles.item, styles.super, chatFilter === 'super_payed' && styles.active])}>S</button>
          </div>
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