import {FC} from 'react'
import styles from './Chat.module.scss';
import ChatMessages from './components/ChatMessages/ChatMessages';
import ChatLetters
  from "@pages/chatPage/components/parts/DialogPart/components/Chat/components/ChatLetters/ChatLetters";
import {useAppSelector} from '@hooks/useReduxTypedHook';

const Chat: FC<any> = () => {
  const {chatData: {chatType}} = useAppSelector(s => s.mainSlice)

  return (
    <div className={styles.wrapper}>
      {chatType === 'MAIL' && <ChatLetters/>}
      {chatType === 'CHAT' && <ChatMessages/>}
    </div>
  )
}

export default Chat;