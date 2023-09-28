import styles from './HistoryItem.module.scss';
import { FC, useState, memo, useEffect } from 'react'
import Avatar from '@components/Avatar/Avatar';
import UserTitle from '@components/UserTitle/UserTitle';
import setChatIcon from '@utils/setChatIcon';
import chatPreview from '@utils/chatPreview';
import CopyableText from '@components/CopyableText/CopyableText';
import { useNavigate } from 'react-router-dom';
import Countdown from 'react-countdown';
import { useAppDispatch } from '@hooks/useReduxTypedHook';
import { main_updateCurrentUser, main_updateDialogUsers } from '@store/slices/mainSlice/mainSlice';
import {Row, Col} from 'antd';

const HistoryItemComponent:FC<any> = (props) => {
  const {
    chat_messageable_type,
    chat_messageable,
    chat_id
  } = props || {}

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  return (
    <div className={styles.wrapper}
      onClick={() => {
        navigate(`/chat?chatType=CHAT&chatId=${chat_id}`)
      }}
      >
      <div className={styles.main}>
        <div className={styles.main_avatar}>
          <Avatar
            size={60}
            />
          <div className={styles.id}>id:<CopyableText>199</CopyableText></div>
        </div>
        <div className={styles.body}>
          <Row gutter={[3,3]}>
            <Col span={24}>
              <UserTitle
                name='Username'
                age={20}
                />
            </Col>
            <Col span={24}>
              <div className={styles.message}>
                {chatPreview({
                  messageType: chat_messageable_type,
                  bodyEx: chat_messageable
                })}
              </div>
            </Col>
            <Col span={24}>
              <div className={styles.time}>12:34</div>
            </Col>
          </Row>
        </div>
      </div>

      <div className={styles.side}>
        <div className={styles.side_main}>
          <div className={styles.side_avatar}>
            <Avatar
              size={40}
              />
          </div>
          <div className={styles.side_username}>
            <UserTitle
              name='Username'
              age={20}
              />
          </div>
        </div>
        <div className={styles.side_ex}>
          <div className={styles.id}>
            id:<CopyableText>312</CopyableText>
          </div>
          {/* <div className={styles.opeartor}>operator</div> */}
        </div>
      </div>
    </div>
  )
}
const HistoryItem = memo(HistoryItemComponent)
export default HistoryItem;