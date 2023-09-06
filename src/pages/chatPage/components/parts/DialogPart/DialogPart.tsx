import styles from './DialogPart.module.scss';
import { FC, useEffect, useState } from 'react'
import DialogUsers from './components/DialogUsers/DialogUsers';
import Chat from './components/Chat/Chat';
import ChatAction from './components/ChatAction/ChatAction';
import { useAppSelector, useAppDispatch } from '@hooks/useReduxTypedHook';
import { main_updateNewMessage } from '@store/slices/mainSlice/mainSlice';

const DialogPart:FC<any> = () => {
  const dispatch = useAppDispatch()
  const {chatData, newMessage} = useAppSelector(s => s.mainSlice)
  const {dialogUsers, currentChatId} = chatData || {}
  
  const [messagesList, setMessagesList] = useState<any[]>([])
  const [lettersList, setLettersList] = useState<any[]>([])


  useEffect(() => {
    console.log('INFINITE LOOP')
    if(newMessage !== null) {
      //НОВОЕ СООБЩЕНИЕ
      if(newMessage?.type === 'NEW') {
        if(currentChatId == newMessage?.chatId) {
          setMessagesList(s => [...s, newMessage?.body])
        }
      }
      //ОБНОВЛЕНИЕ СТАРОГО
      if(newMessage?.type === 'UPDATE') {
        if(currentChatId == newMessage?.chatId) {
          setMessagesList(s => {
            const find = s?.find(i => i?.id == newMessage?.body?.id)
            const findIndex = s?.findIndex(i => i?.id == newMessage?.body?.id)
            if(findIndex !== -1 && find) {
              const m = s;
              const rm = s.splice(findIndex, 1, newMessage?.body)
              return [...m]
            } 
            return s
          })
        }
      }
      dispatch(main_updateNewMessage(null))
    }
  }, [newMessage])
  

  return (
    <div className={styles.wrapper}>
      <div className={styles.users}>
        {dialogUsers && <DialogUsers/>}
      </div>
      <div className={styles.chat}>
        <Chat
          messagesList={messagesList}
          lettersList={lettersList}
          setMessagesList={setMessagesList}
          setLettersList={setLettersList}
          />
      </div>
      {
        currentChatId && (
          <div className={styles.action}>
            <ChatAction/>
          </div>
        )
      }
    </div>
  )
}

export default DialogPart;