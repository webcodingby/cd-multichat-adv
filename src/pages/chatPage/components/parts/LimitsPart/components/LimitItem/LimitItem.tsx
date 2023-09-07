import styles from './LimitItem.module.scss';
import {Row, Col} from 'antd';
import Avatar from '@components/Avatar/Avatar';
import { FC, memo, useState } from 'react'
import UserTitle from '@components/UserTitle/UserTitle';
import getClassNames from '@utils/getClassNames';
import CopyableText from '@components/CopyableText/CopyableText';
import moment from 'moment';
import { main_updateCreateChatData, main_updateDialogUsers } from '@store/slices/mainSlice/mainSlice';
import { useAppDispatch } from '@hooks/useReduxTypedHook';
import { useNavigate } from 'react-router-dom';
import Countdown from 'react-countdown';

const LimitItemComponent:FC<any> = ({
  man,
  girl,
  updated_at,
  girl_id,
  man_id,
  id,
  created_at
}) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [isDisabled, setIsDisabled] = useState(false)

  const onClick = () => {
    if(!isDisabled) {
      navigate('/chat?chatType=CHAT')
    
      dispatch(main_updateDialogUsers({man, girl}))
      dispatch(main_updateCreateChatData({
        anket_id: girl_id,
        man_id: man_id,
        operator_chat_limit_id: id,
        man,
        girl
      }))
    }
  }

  return (
    <div 
      onClick={onClick}
      className={getClassNames([styles.wrapper, isDisabled && styles.disabled])}>
      <Row gutter={[10,10]}>
        <Col span={12}>
          <div className={styles.part}>
            <div className={styles.avatar}>
              <Avatar
                size={60}
                image={man?.user_thumbnail_url || man?.user_avatar_url}
                isOnline={man?.online === 1}
                />  
            </div>  
            <div className={styles.body}>
              <Row gutter={[5,5]}>
                <Col span={24}>
                  <div className={styles.item}>
                    <UserTitle
                      name={man?.name}
                      age={man?.age}
                      />
                  </div>
                </Col>
                <Col span={24}>
                  <div className={getClassNames([styles.item, styles.date])}>
                  {moment(updated_at).format('MM/DD hh:mm')}
                  </div>
                </Col>
                <Col span={24}>
                  <div className={getClassNames([styles.item, 'def-id'])}>
                    id<CopyableText>{man?.id}</CopyableText>
                  </div>
                </Col>
              </Row>
            </div>
          </div>  
        </Col>  
        <Col span={12}>
          <div className={getClassNames([styles.part, styles.last])}>
            <div className={styles.body}>
              <Row gutter={[5,5]}>
                <Col span={24}>
                  <div className={styles.item}>
                    <UserTitle
                      name={girl?.name}
                      age={girl?.age}
                      />
                  </div>
                </Col>
                <Col span={24}>
                <Countdown 
                  date={moment.utc(created_at).valueOf() + 180000}
                  renderer={({hours,minutes,seconds, completed}) => {
                    if(completed) {
                      setIsDisabled(true)
                      return (
                        <span className={getClassNames([styles.timer, styles.warn])}>
                          00:00:00
                        </span>
                      )
                    } else {
                      return (
                        <span style={{color:'var(--green_1)'}}>
                          {hours < 10 ? `0${hours}` : hours}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                        </span>
                      )
                    }
                    
                  }}
                  />
                </Col>
              </Row>
            </div>
            <div className={styles.avatar}>
              <Avatar
                size={60}
                isOnline={girl?.online === 1}
                image={girl?.user_thumbnail_url || girl?.user_avatar_url}
                />
            </div>
          </div>  
        </Col>  
      </Row>      
    </div>
  )
}

const LimitItem = memo(LimitItemComponent)
export default LimitItem;