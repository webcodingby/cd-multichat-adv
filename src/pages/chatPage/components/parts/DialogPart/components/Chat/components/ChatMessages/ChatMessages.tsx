import { FC, useEffect, useState } from 'react'
import Message from '../Message/Message';
import styles from './ChatMessages.module.scss';
import { useInView } from 'react-intersection-observer';
import apiSlice, { useGetMessageChatQuery } from '@store/slices/apiSlice/apiSlice';
import { useAppSelector } from '@hooks/useReduxTypedHook';
import { useSearchParams } from 'react-router-dom';
import Loader from '@components/Loader/Loader';

interface I {
  list?:any[],
  loadMore?:(...args:any[]) => any
}

const ChatMessages:FC<any> = () => {
  const {token, chatData: {currentChatId}, newMessage} = useAppSelector(s => s.mainSlice)
  const [getList] = apiSlice.endpoints.getMessageChat.useLazyQuery()
  const [list, setList] = useState<any[]>([])
  const [page, setPage] = useState(0);
  const [params] = useSearchParams()
  const [loadMore, setLoadMore] = useState(false)
  const {ref, inView} = useInView()
  const [selfId, setSelfId] = useState<any>(null)
  const [isEnd, setIsEnd] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if(inView && loadMore && !isEnd) {
      setPage(s => s + 1)
    }
  }, 
    [inView, loadMore, isEnd]
  )

  useEffect(() => {
    setPage(1)
    if(params?.get('selfId')) setSelfId(params?.get('selfId'))
  }, [params?.get('selfId')])

  const getListFunc = () => {
    if(token && page > 0 && currentChatId) {
      page === 1 && setIsLoading(true)
      getList({token, body: {page, id: currentChatId}}).then(res => {
        if(res?.isLoading && page === 1) {
          setIsLoading(true)
        }
        if(res.isSuccess) {
          if(res?.data?.chat_messages?.data?.length === 0) {
            setIsEnd(true)
          } else setIsEnd(false)
          if(page === 1) {
            setList(res?.data?.chat_messages?.data)
          }
          if(page > 1) {
            setList(s => [...s, ...res?.data?.chat_messages?.data])
          }
        }
      }).finally(() => {
        setLoadMore(true)
        setIsLoading(false)
      })
    }
  }

  useEffect(() => {
    getListFunc()
  }, [page, token])

  useEffect(() => {
    if(page === 1) {
      getListFunc()
    }
    setPage(1)
    setList([])
  }, [currentChatId])

  useEffect(() => {
    if(newMessage && newMessage?.chatId == currentChatId) {
      setList(s => [newMessage?.body, ...s])
    }
  }, [newMessage])

  return (
    <div className={styles.wrapper}>
      {isLoading && <Loader/>}
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
      {
        loadMore && <div className={styles.loader} ref={ref}></div>
      }
    </div>
  )
}

export default ChatMessages;