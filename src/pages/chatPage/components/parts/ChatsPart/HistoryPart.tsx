import styles from './ChatsPart.module.scss';
import { FC, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer';
import ChatItem from './components/ChatItem/ChatItem';
import getClassNames from '@utils/getClassNames';
import { useAppDispatch, useAppSelector } from '@hooks/useReduxTypedHook';
import { main_incMessageChatsPage } from '@store/slices/mainSlice/mainSlice';

import InboxItem from '../InboxPart/components/InboxItem/InboxItem';
import apiSlice from '@store/slices/apiSlice/apiSlice';
import HistoryItem from './components/HistoryItem/HistoryItem';


const HistoryPart:FC<any> = () => {
  const dispatch = useAppDispatch()
  const {chatData, token} = useAppSelector(s => s.mainSlice)
  const [getList] = apiSlice.endpoints.getHistory.useLazyQuery()
  const {messageChats, currentChatId, chatType, isEndMessageChats} = chatData || {}
  const [loadMore, setLoadMore] = useState(false)
  const {inView, ref} = useInView()
  const [local, setLocal] = useState(0)
  const [list, setList] = useState<any[]>([])

  useEffect(() => {
    if(token) {
      getList({token, body: {page:1}}).then((res:any) => {
        if(res?.data) {
          setList(res?.data?.data)
        }
      })
    }
  }, [token])

  return (
    <div className={getClassNames([styles.wrapper, 'custom-scroll'])}>
      {
        list?.map((i, index) => (
          <HistoryItem
            {...i}
            />
        ))
      }
    </div>
  )
}

export default HistoryPart;