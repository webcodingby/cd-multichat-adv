import { FC, useEffect, useState } from 'react'
import styles from './ChatPage.module.scss';
import { useAppSelector, useAppDispatch } from '@hooks/useReduxTypedHook';
import apiSlice, { useGetLetterChatsQuery } from '@store/slices/apiSlice/apiSlice';
import { useSearchParams } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import LeftSide from './components/LeftSide/LeftSide';
import Center from './components/Center/Center';
import RightSide from './components/RightSide/RightSide';
import ChatClass from '@classes/chat/ChatClass';
import Button from '@components/Button/Button';
import { useGetMessageChatsQuery } from '@store/slices/apiSlice/apiSlice';


const CHATAPI = new ChatClass();

const ChatPage:FC<any> = () => {
  const {token} = useAppSelector(s => s.mainSlice)
  const [params, setParams] = useSearchParams()
  
  const [messageChatsPage, setMessageChatsPage] = useState(1)
  const [letterChatsPage, setLetterChatsPage] = useState(1)

  const messageChatsListRes = useGetMessageChatsQuery({
    token, 
    body: {
      page: messageChatsPage
    }
  })
  const letterChatsListRes = useGetLetterChatsQuery({
    token, 
    body: {
      page: letterChatsPage
    }
  })
  

  const [chatType, setChatType] = useState<'CHAT' | 'MAIl' | any>()
  const [messageChatsList, setMessageChatsList] = useState<any[]>([])
  const [letterChatsList, setLetterChatsList] = useState<any[]>([])
  // const [messagesList, setMessagesList] = useState<any[]>([])
  // const [limitsList, setLimitsList] = useState<any[]>([])
  // const [inboxList, setInboxList] = useState<any[]>([])

  useEffect(() => {
    if(params?.get('chatType') === 'MAIL' || params?.get('chatType') === 'CHAT') {
      setMessageChatsPage(1)
      setLetterChatsPage(1)
      setLetterChatsList([])
      setMessageChatsList([])
      setChatType(params?.get('chatType'))
    }
  }, [params?.get('chatType')])

  useEffect(() => {
    const {data, isSuccess, isFetching} = messageChatsListRes
    if(chatType === 'CHAT') {
      if(messageChatsPage === 1) {
        if(!isFetching && isSuccess) {
          setMessageChatsList(CHATAPI.updateList({
            list: data?.data,
            listType: 'CHATS',
            modifyType: 'INIT'
          }))
        }
      }
      if(messageChatsPage > 1) {
        if(!isFetching && isSuccess) {
          setMessageChatsList(CHATAPI.updateList({
            list: data?.data,
            listType: 'CHATS',
            modifyType: 'ADD'
          }))
        }
      }
    }
  }, 
    [messageChatsListRes, chatType]
  )

  useEffect(() => {
    const {data, isSuccess, isFetching} = letterChatsListRes
    if(chatType === 'MAIL') {
      if(letterChatsPage === 1) {
        if(!isFetching && isSuccess) {
          setLetterChatsList(CHATAPI.updateList({
            list: data?.data,
            listType: 'CHATS',
            modifyType: 'INIT'
          }))
        }
      }
      if(letterChatsPage > 1) {
        if(!isFetching && isSuccess) {
          setLetterChatsList(CHATAPI.updateList({
            list: data?.data,
            listType: 'CHATS',
            modifyType: 'ADD'
          }))
        }
      }
    }
  }, 
    [letterChatsListRes, chatType]
  )
 
  
  return (
    <>
      <Layout
        leftSide={<LeftSide/>}
        center={
          <Center
            
            />
        }
        rightSide={
          <RightSide 
            messageChatsList={messageChatsList} 
            letterChatsList={letterChatsList}
            messageChatListLoadMore={setMessageChatsPage}
            letterChatsListLoadMore={setLetterChatsPage}
            />
        }
        />
    </>
    
  )
}

export default ChatPage;