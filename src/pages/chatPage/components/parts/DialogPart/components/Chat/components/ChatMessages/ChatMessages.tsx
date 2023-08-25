import { FC, useEffect, useState } from 'react'
import Message from '../Message/Message';
import styles from './ChatMessages.module.scss';
import { useInView } from 'react-intersection-observer';
import { useGetMessageChatQuery } from '@store/slices/apiSlice/apiSlice';
import { useAppSelector } from '@hooks/useReduxTypedHook';
import { useSearchParams } from 'react-router-dom';

interface I {
  list?:any[],
  loadMore?:(...args:any[]) => any
}

const ChatMessages:FC<I> = ({
  list = [],
  loadMore
}) => {
  const [params] = useSearchParams()
  const {inView, ref} = useInView()
  useEffect(() => {
    // (inView && loadMore) && loadMore((s:number) => s + 1)
  }, 
    [inView, loadMore]
  )
  const [selfId, setSelfId] = useState<any>(null)
  useEffect(() => {
    if(params?.get('selfId')) setSelfId(params?.get('selfId'))
  }, [params?.get('selfId')])

  return (
    <div className={styles.wrapper}>
      {
        list?.length > 0 && <div className={styles.loader} ref={ref}></div>
      }
      {
        list.map((i,index) => (
          selfId && (
            <Message
              id={i?.id}
              avatar={i?.sender_user?.user_thumbnail_url}
              updatedAt={i?.updated_at}
              createdAt={i?.created_at}
              isRead={i?.is_read_by_recepient === 1}
              body={i?.chat_messageable}
              type={i?.chat_messageable_type}
              isSelf={i?.sender_user?.id == selfId ? 1 : 0}
              isShowAvatar={i.sender_user?.id !== list[index - 1]?.sender_user?.id}
              key={index}
              />
          )
        ))
      }
    </div>
  )
}

export default ChatMessages;