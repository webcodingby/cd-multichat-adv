import styles from './InboxItem.module.scss';
import { FC } from 'react'
import Avatar from '@components/Avatar/Avatar';
import UserTitle from '@components/UserTitle/UserTitle';
import setChatIcon from '@utils/setChatIcon';
import chatPreview from '@utils/chatPreview';
import CopyableText from '@components/CopyableText/CopyableText';
import { useNavigate } from 'react-router-dom';

const InboxItem:FC<any> = (props) => {
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

  const navigate = useNavigate()

  const onClick = () => {
    if(deleted_by_first_user === 0 && deleted_by_second_user === 0) {
      if(type_of_model === 'chat') {
        navigate(`/chat?chatType=CHAT?chatId=${id}&selfId=${self_user?.id}`)
      }
      if(type_of_model === 'letter') {
        navigate(`/chat?chatType=MAIL?chatId=${id}&selfId=${self_user?.id}`)
      }
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
              />
          </div>
          <div className={styles.body}>
            <div className={styles.item}>
              <UserTitle
                name={name}
                age={age}
                />
            </div>
            <div className={styles.item}>
              <div className={styles.type}>
                {setChatIcon('CHAT', {color: 'var(--violet_1)'})}
              </div>
              <div className={styles.message}>
                {chatPreview({
                  messageType: type_of_model === 'letter' ? 'MAIL' : 'CHAT',
                  body: last_message
                })}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.main_ex}></div>
      </div>
      <div className={styles.ex}>
        <div className={styles.ex_avatar}>
          <Avatar
            size={54}
            image={self_user?.user_thumbnail_url}
            />
        </div>
        <div className={styles.ex_body}>
          <div className={styles.ex_item}>
            <UserTitle
              style={{wrapperStyle: {fontSize: 10}}}
              name={self_user?.name}
              age={self_user?.age}
              />
          </div>
          <div className={styles.ex_item}>02:00</div>
          <div className={styles.ex_item}>
            id{<CopyableText>{self_user?.id}</CopyableText>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default InboxItem;