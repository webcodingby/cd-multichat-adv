import styles from './DialogPart.module.scss';
import { FC, useEffect, useState } from 'react'
import DialogUsers from './components/DialogUsers/DialogUsers';
import Chat from './components/Chat/Chat';
import ChatAction from './components/ChatAction/ChatAction';
import { useAppSelector, useAppDispatch } from '@hooks/useReduxTypedHook';
import { main_updateNewMessage } from '@store/slices/mainSlice/mainSlice';
import { useNavigate } from 'react-router-dom';


const DialogPart:FC<any> = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const {chatData, newMessage, createChatData} = useAppSelector(s => s.mainSlice)
  const {dialogUsers, currentChatId} = chatData || {}
  
  const [messagesList, setMessagesList] = useState<any[]>([])
  const [lettersList, setLettersList] = useState<any[]>([])


  useEffect(() => {
    if(createChatData) {
      setMessagesList([])
      setLettersList([])
    }
  }, [createChatData])


  


  useEffect(() => {
    if(newMessage !== null) {
      //НОВОЕ СООБЩЕНИЕ
      if(newMessage?.type === 'NEW') {
        if(currentChatId == newMessage?.chatId) {
          setMessagesList(s => [newMessage?.body, ...s])
        }
      }
      //ОБНОВЛЕНИЕ СТАРОГО
      if(newMessage?.type === 'UPDATE') {
        if(currentChatId == newMessage?.chatId) {
          setMessagesList(s => {
            const m = [...s];
            const find = m?.find(i => i?.id == newMessage?.body?.id)
            const findIndex = m?.findIndex(i => i?.id == newMessage?.body?.id)
            if(findIndex !== -1 && findIndex >= 0 && find) {
              const rm = m.splice(findIndex, 1, newMessage?.body)
              return [...m]
            } 
            return m
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
        {
          !createChatData && (
            <Chat
              messagesList={messagesList}
              lettersList={lettersList}
              setMessagesList={setMessagesList}
              setLettersList={setLettersList}
              />
          )
        }
      </div>
      <div className={styles.action}>
        <ChatAction/>
      </div>
    </div>
  )
}

export default DialogPart;