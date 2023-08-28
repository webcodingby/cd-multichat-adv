import styles from './ChatsPart.module.scss';
import { FC, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer';
import ChatItem from './components/ChatItem/ChatItem';
import getClassNames from '@utils/getClassNames';
import { useAppDispatch, useAppSelector } from '@hooks/useReduxTypedHook';
import { main_incMessageChatsPage } from '@store/slices/mainSlice/mainSlice';



const ChatsPart:FC<any> = () => {
  const dispatch = useAppDispatch()
  const {chatData} = useAppSelector(s => s.mainSlice)
  const {messageChats, currentChatId, chatType} = chatData || {}
  const [loadMore, setLoadMore] = useState(false)
  const {inView, ref} = useInView()

  useEffect(() => {
    if(messageChats?.length > 0) setLoadMore(true)
  }, [messageChats])

  useEffect(() => {
    (inView && loadMore) && dispatch(main_incMessageChatsPage())
  }, 
    [inView, loadMore]
  )

  

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
            key={index}/>
        ))
      }
      {
        messageChats?.length > 0 && <div className={styles.loader} ref={ref}>
          {/* <PulseLoader color={"var(--violet_1)"}/> */}
          </div>
      }
      
    </div>
  )

}

export default ChatsPart;