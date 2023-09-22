import styles from './InboxItem.module.scss';
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
const InboxItemComponent:FC<any> = (props) => {
  const {
    name,
    age,
    user_thumbnail_url,
    user_avatar_url,
    online,
  } = props?.other_user || {}

  const {
    self_user,
    last_message,
    type_of_model,
    currentId,
    type,
    id,
    deleted_by_first_user,
    deleted_by_second_user
  } = props
  const dispatch = useAppDispatch()
  const [isTimeEnd, setIsTimeEnd] = useState(false)
  const navigate = useNavigate()

  const onClick = () => {
    if(deleted_by_first_user === 0 && deleted_by_second_user === 0) {
      if(type_of_model === 'chat') {
        navigate(`/chat?chatType=CHAT&chatId=${id}&selfId=${self_user?.id}`)
      }
      if(type_of_model === 'letter') {
        // navigate(`/chat?chatType=MAIL&chatId=${id}&selfId=${self_user?.id}`)
      }
      dispatch(main_updateDialogUsers({
        man: props?.other_user,
        girl: self_user 
      }))
    }
  } 

  return (
    <div 
      onClick={onClick}
      className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.main_top}>
          <div className={styles.avatar}>
            <Avatar
              size={60}
              image={user_thumbnail_url}
              isOnline={online == 1}
              onClick={() => dispatch(main_updateCurrentUser(props?.other_user?.id))}
              />
          </div>
          <div className={styles.body}>
            <div className={styles.item}>
              <UserTitle
                name={name || 'Username'}
                age={age || 20}
                />
            </div>
            <div className={styles.item}>
              <div className={styles.type}>
                {setChatIcon('CHAT', {color: 'var(--violet_1)'})}
              </div>
              <div className={styles.message}>
                {chatPreview({
                  messageType: last_message?.chat_messageable_type,
                  body: last_message
                })}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.main_ex}>
          id<CopyableText>{self_user?.id || 999}</CopyableText>
        </div>
      </div>
      <div className={styles.ex}>
        <div className={styles.ex_avatar}>
          <Avatar
            size={54}
            image={self_user?.user_thumbnail_url}
            onClick={() => dispatch(main_updateCurrentUser(self_user?.id))}
            />
        </div>
        <div className={styles.ex_body}>
          <div className={styles.ex_item}>
            <UserTitle
              style={{wrapperStyle: {fontSize: 10}}}
              name={self_user?.name || 'Username'}
              age={self_user?.age || 20}
              />
          </div>
          <div className={styles.ex_item}>
            <Countdown 
              date={Date.now() + 10000}
              renderer={({hours,minutes,seconds, completed}) => {
                if(completed) {
                  return (
                    <span style={{color: 'var(--red_1)'}}>00:00:00</span>
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
            </div>
          <div className={styles.ex_item}>
            id{<CopyableText>{self_user?.id}</CopyableText>}
          </div>
        </div>
      </div>
    </div>
  )
}


const InboxItem = memo(InboxItemComponent)
export default InboxItem;