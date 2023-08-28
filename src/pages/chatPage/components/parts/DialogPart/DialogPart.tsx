import styles from './DialogPart.module.scss';
import { FC} from 'react'
import DialogUsers from './components/DialogUsers/DialogUsers';
import Chat from './components/Chat/Chat';
import ChatAction from './components/ChatAction/ChatAction';
import { useAppSelector } from '@hooks/useReduxTypedHook';

const DialogPart:FC<any> = () => {
  const {chatData} = useAppSelector(s => s.mainSlice)
  const {dialogUsers, currentChatId} = chatData || {}

  return (
    <div className={styles.wrapper}>
      <div className={styles.users}>
        {dialogUsers && <DialogUsers/>}
      </div>
      <div className={styles.chat}>
        <Chat
          />
      </div>
      {/* {
        currentChatId && (
          <div className={styles.action}>
            <ChatAction/>
          </div>
        )
      } */}
      <div className={styles.action}>
        <ChatAction/>
      </div>
    </div>
  )
}

export default DialogPart;