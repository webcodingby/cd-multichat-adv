import {FC} from 'react'
import styles from './Chat.module.scss';
import ChatMessages from './components/ChatMessages/ChatMessages';
import ChatLetters
  from "@pages/chatPage/components/parts/DialogPart/components/Chat/components/ChatLetters/ChatLetters";
import {useAppSelector} from '@hooks/useReduxTypedHook';

interface I {
  messagesList: any[],
  lettersList?:any[],
  setMessagesList:(...args:any[]) => any,
  setLettersList?:(...args:any[]) => any
}

const Chat: FC<I> = ({
  messagesList,
  lettersList,
  setMessagesList,
  setLettersList
}) => {
  const {chatData: {chatType}} = useAppSelector(s => s.mainSlice)



  return (
    <div className={styles.wrapper}>
      {chatType === 'MAIL' && (
        <ChatLetters/>
      )}
      {chatType === 'CHAT' && (
        <ChatMessages
          list={messagesList}
          setList={setMessagesList}
          />
      )}
    </div>
  )
}

export default Chat;