import { FC } from 'react'
import styles from './Chat.module.scss';
import ChatMessages from './components/ChatMessages/ChatMessages';
import { useAppSelector } from '@hooks/useReduxTypedHook';

const Chat:FC<any> = () => {
  const {chatData: {chatType}} = useAppSelector(s => s.mainSlice)
  

  return (
    <div className={styles.wrapper}>
      {
        chatType === 'MAIL' && null
      }
      {
        chatType === 'CHAT' && <ChatMessages/>
      }
      
    </div>
  )
}

export default Chat;