import apiSlice from '@store/slices/apiSlice/apiSlice';
import styles from './ChatLetters.module.scss';
import { FC, useEffect, useState } from 'react'
import { useAppSelector } from '@hooks/useReduxTypedHook';
import { useSearchParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import Letter from '../Letter/Letter';

const ChatLetters:FC<any> = () => {
  const {token, chatData: {currentChatId}} = useAppSelector(s => s.mainSlice)
  const [list, setList] = useState<any[]>([])
  const [getList] = apiSlice.endpoints.getLetterChat.useLazyQuery()
  const [page, setPage] = useState(0);
  const [params] = useSearchParams()
  const [loadMore, setLoadMore] = useState(false)
  const {ref, inView} = useInView()
  const [selfId, setSelfId] = useState<any>(null)

  useEffect(() => {
    if(inView && loadMore) {
      setPage(s => s + 1)
    }
  }, [inView, loadMore])

  useEffect(() => {
    if(params?.get('selfId')) setSelfId(params?.get('selfId'))
  }, [params?.get('selfId')])

  useEffect(() => {
    if(token && page > 0 && currentChatId) {
      setLoadMore(false)
      getList({token, body: {page, id: currentChatId}}).then(res => {
        if(res.isSuccess) {
          if(page === 1) {
            setList(res?.data?.chat_messages?.data)
          }
          if(page > 1) {
            setList(s => [...s, ...res?.data?.chat_messages?.data])
          }
        }
      }).finally(() => setLoadMore(true))
    }
  }, [page, token])

  useEffect(() => {
    setPage(1)
    setList([])
  }, [currentChatId])


  return (
    <div className={styles.wrapper}>
      {
        list?.map((i, index) => (
          <Letter {...i} key={index}/>
        ))
      }
      {
        loadMore && <div className={styles.loader} ref={ref}></div>
      }
    </div>
  )
}

export default ChatLetters;