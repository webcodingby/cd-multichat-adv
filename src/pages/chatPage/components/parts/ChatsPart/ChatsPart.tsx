import styles from './ChatsPart.module.scss';
import { FC, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer';
import ChatItem from './components/ChatItem/ChatItem';
import getClassNames from '@utils/getClassNames';
import { useAppDispatch, useAppSelector } from '@hooks/useReduxTypedHook';
import { main_incMessageChatsPage } from '@store/slices/mainSlice/mainSlice';
import Input from '@components/Input/Input';



const ChatsPart:FC<any> = () => {
  const dispatch = useAppDispatch()
  const {chatData} = useAppSelector(s => s.mainSlice)
  const {messageChats, currentChatId, chatType, isEndMessageChats} = chatData || {}
  const [loadMore, setLoadMore] = useState(false)
  const {inView, ref} = useInView()
  const [local, setLocal] = useState(0)
  
  useEffect(() => {
    if (inView && loadMore && !isEndMessageChats) {
      dispatch(main_incMessageChatsPage())
    }
  }, 
    [inView, loadMore, isEndMessageChats]
  )

  useEffect(() => {
    setLoadMore(true)
  }, [messageChats])
  
  return (
    <div className={getClassNames([styles.wrapper, 'custom-scroll'])}>
      {
        messageChats.map((i, index) => (
          <ChatItem 
            isActive={currentChatId == i.id && chatType === 'CHAT'}
            id={i.id}
            created_at={i.created_at}
            updated_at={i.updated_at}
            limits={{
              avialable_limit: i.available_limit,
              max_limit: i.max_limit
            }}
            selfUser={i?.self_user}
            otherUser={i?.other_user}
            last_message={i?.last_message}
            key={index}/>
        ))
      }

      {
        (loadMore && messageChats?.length > 0) && <div className={styles.loader} ref={ref}></div>
      }
      
    </div>
  )

}

export default ChatsPart;