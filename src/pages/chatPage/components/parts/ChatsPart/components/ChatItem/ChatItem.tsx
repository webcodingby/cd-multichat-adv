import { FC, ReactNode, memo, useEffect, useState } from 'react'
import styles from './ChatItem.module.scss';
import { Row, Col } from 'antd';
import getClassNames from '@utils/getClassNames';
import Avatar from '@components/Avatar/Avatar';
import UserTitle from '@components/UserTitle/UserTitle';
import { useNavigate } from 'react-router-dom';
import CopyableText from '@components/CopyableText/CopyableText';
import copyText from '@components/CopyableText/copyText';
import { useAppDispatch, useAppSelector } from '@hooks/useReduxTypedHook';
import { main_updateDialogUsers } from '@store/slices/mainSlice/mainSlice';
import moment from 'moment';

interface I {
  children?: ReactNode,
  isActive?: boolean
  id?: any,
  selfUser?: any,
  otherUser?: any,
  limits?: { avialable_limit: any, max_limit: any } | null,
  created_at?: any,
  updated_at?: any,
  last_message?:any
}

const ChatItemComponent: FC<I> = ({
  isActive,
  id,
  selfUser,
  otherUser,
  limits,
  created_at,
  updated_at,
  last_message
}) => {
  const nav = useNavigate()
  const dispatch = useAppDispatch()
  const { chatData: { chatType } } = useAppSelector(s => s.mainSlice)
  const [ago, setAgo] = useState('')

  const goToChat = (e: any) => {
    if (!e?.target?.classList?.contains('copy-text')) {
      dispatch(main_updateDialogUsers({ girl: selfUser, man: otherUser }))
      nav(`/chat?chatType=${chatType}&chatId=${id}&selfId=${selfUser?.id}`)
    } else {
      copyText(e?.target?.innerText)
    }
  }

  useEffect(() => {
    if(last_message && last_message?.created_at) {
      const dateFrom = moment.utc(last_message?.created_at)
      const dateNow = moment.utc()

      const diff = dateNow.diff(dateFrom)
      const start = moment.utc(diff).valueOf()
      // console.log(moment.utc(start).get('hours'))
      if(moment.utc(start).get('hours') >= 24) {
        setAgo(`${Math.floor(moment.utc(start).get('hours') / 24).toString()}д`)
      }
      if(moment.utc(start).get('hours') < 24 && moment.utc(start).get('hours') >= 1) {
        // setAgo(moment.utc(start).get('hours') + 'ч')
        setAgo(`${moment.utc(start).format('HH')}ч ${moment.utc(start).format('mm')}мин`)
      }
      if(moment.utc(start).get('hours') < 1) {
        setAgo(moment.utc(start).get('minutes') + 'мин')
      }
    }
    
    

  }, [last_message])

  return (
    <div
      onClick={goToChat}
      className={getClassNames([styles.wrapper, isActive && styles.active])}>
      <Row gutter={[12,12]}>
        <Col span={12}>
          <div className={getClassNames([styles.part, styles.left])}>
            <div className={styles.avatar}>
              <Avatar
                image={selfUser?.user_thumbnail_url}
                size={60}
              />
            </div>
            <div className={styles.main}>
              <Row gutter={[5, 5]}>
                <Col span={24}>
                  <UserTitle
                    name={selfUser?.name || 'Username'}
                    age={selfUser?.age}
                  />
                </Col>
                <Col span={24} style={{ color: 'var(--gray_1)' }}>
                  id<CopyableText>{selfUser?.id || 999}</CopyableText>
                </Col>
                <Col span={24}>
                  <div className={styles.time}>
                    {/* {moment.utc(moment.utc(updated_at)).fromNow()} */}
                    {ago}
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div className={getClassNames([styles.part, styles.right])}>
            <div className={styles.main}>
              <Row gutter={[5, 5]}>
                {
                  limits && (
                    <Col span={24}>
                      <div className={styles.limits}>
                        {limits?.avialable_limit || 0}/{limits?.max_limit || 0}
                      </div>
                    </Col>
                  )
                }
                <Col span={24}>
                  <UserTitle
                    style={{ wrapperStyle: { textAlign: 'right' } }}
                    name={otherUser?.name || 'Username'}
                    age={otherUser?.age}
                  />
                </Col>
              </Row>
            </div>
            <div className={styles.avatar}>
              <Avatar
                isOnline={otherUser?.online === 1}
                image={otherUser?.user_thumbnail_url}
                size={60}
              />
            </div>
          </div>
        </Col>
      </Row>
      
     
      
    </div>
  )
}
const ChatItem = memo(ChatItemComponent);
export default ChatItem;