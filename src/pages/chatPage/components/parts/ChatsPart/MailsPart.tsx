import styles from './ChatsPart.module.scss';
import { FC, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer';
import ChatItem from './components/ChatItem/ChatItem';
import getClassNames from '@utils/getClassNames';
import { useAppDispatch, useAppSelector } from '@hooks/useReduxTypedHook';
import { main_incLetterChatsPage } from '@store/slices/mainSlice/mainSlice';

const MailsPart:FC<any> = () => {
  const dispatch = useAppDispatch()
  const {chatData} = useAppSelector(s => s.mainSlice)
  const {letterChats, chatType, currentChatId} = chatData || {}
  const [loadMore, setLoadMore] = useState(false)
  const {inView, ref} = useInView()
  

  useEffect(() => {
    if(letterChats?.length > 0) setLoadMore(true)
  }, [letterChats])

  useEffect(() => {
    (inView && loadMore) && dispatch(main_incLetterChatsPage())
  }, 
    [inView, loadMore]
  )

  return (
    <div className={getClassNames([styles.wrapper, 'custom-scroll'])}>
      {
        letterChats.map((i, index) => (
          <ChatItem 
            isActive={currentChatId == i.id && chatType === 'MAIL'}
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
        letterChats?.length > 0 && <div className={styles.loader} ref={ref}>
          {/* <PulseLoader color={"var(--violet_1)"}/> */}
          </div>
      }

    </div>
  )
}

export default MailsPart;