import { FC, useEffect, useState, createContext } from 'react'
import { useAppSelector } from '@hooks/useReduxTypedHook';
import { useGetInboxListQuery, useGetLetterChatsQuery, useGetLimitsListQuery, useGetMessageChatQuery } from '@store/slices/apiSlice/apiSlice';
import { useSearchParams } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import LeftSide from './components/LeftSide/LeftSide';
import Center from './components/Center/Center';
import RightSide from './components/RightSide/RightSide';
import ChatClass from '@classes/chat/ChatClass';
import { useGetMessageChatsQuery, useSendMessageMutation } from '@store/slices/apiSlice/apiSlice';

export const ChatLoadingContext = createContext(false)

const CHATAPI = new ChatClass();

const ChatPage:FC<any> = () => {
  const {token, chatData} = useAppSelector(s => s.mainSlice)
  const {

  } = chatData
  const [params] = useSearchParams()

  const [chatType, setChatType] = useState<'CHAT' | 'MAIl' | any>()
  const [chatId, setChatId] = useState<any>()
  
  const [messageChatsPage, setMessageChatsPage] = useState(1)
  const [letterChatsPage, setLetterChatsPage] = useState(1)
  const [inboxPage, setInboxPage] = useState(1)
  const [messagesPage, setMessagesPage] = useState(1)

  //LOADING STATES
  const [chatLoading, setChatLoading] = useState(false);

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
  const limitsListRes = useGetLimitsListQuery({
    token,
    body: {
      page: 1
    }
  })
  const getInboxListRes = useGetInboxListQuery({
    token,
    body: {
      page: inboxPage
    }
  })
  const messageChatRes = useGetMessageChatQuery({
    token,
    body: {
      id: chatId,
      page: messagesPage,
    }
  })

  
  const [messageChatsList, setMessageChatsList] = useState<any[]>([])
  const [letterChatsList, setLetterChatsList] = useState<any[]>([])
  const [messagesList, setMessagesList] = useState<any[]>([])
  const [limitsList, setLimitsList] = useState<any[]>([])
  const [inboxList, setInboxList] = useState<any[]>([])

  

  useEffect(() => {
    if(params?.get('chatType') === 'MAIL' || params?.get('chatType') === 'CHAT') {
      setMessageChatsPage(1)
      setLetterChatsPage(1)
      setMessagesPage(1)
      setLetterChatsList([])
      setMessageChatsList([])
      setChatType(params?.get('chatType'))
    }
  }, [params?.get('chatType')])

  useEffect(() => {
    if(params?.get('chatId') && typeof params?.get('chatId') === 'string') {
      setChatLoading(true)
      setChatId(params.get('chatId'))
      console.log('CHAT ID CHANGED')
      setMessagesPage(1)
    }
  }, [params?.get('chatId')])

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
    const {data, isFetching, isSuccess} = limitsListRes
    if(!isFetching && isSuccess) {
      setLimitsList(CHATAPI.updateList({
        list: data?.data,
        listType: 'LIMITS',
        modifyType: 'ADD'
      }))
    }
  }, 
    [limitsListRes]
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

  useEffect(() => {
    const {data, isFetching, isSuccess} = messageChatRes
    if(messagesPage === 1) {
      if(!isFetching) setChatLoading(false)
      if(!isFetching && isSuccess) {
        setMessagesList(CHATAPI.updateList({
          list: data?.chat_messages?.data,
          listType: 'MESSAGES',
          modifyType: 'INIT'
        }))
      }
    }
    if(messagesPage > 1) {  
      if(!isFetching) setChatLoading(false)
      if(!isFetching && isSuccess) {
        setMessagesList(CHATAPI.updateList({
          list: data?.chat_messages?.data,
          listType: 'MESSAGES',
          modifyType: 'ADD'
        }))
      }
    }
  }, 
    [messageChatRes]
  )

  useEffect(() => {
    const {data, isFetching, isSuccess} = getInboxListRes
    if(inboxPage === 1) {
      if(!isFetching && isSuccess) {
        setInboxList(CHATAPI.updateList({
          list: data?.data,
          listType: 'INBOX',
          modifyType: 'INIT'
        }))
      }
    } 
    if(inboxPage > 1) {
      if(!isFetching && isSuccess) {
        setInboxList(CHATAPI.updateList({
          list: data?.data,
          listType: 'INBOX',
          modifyType: 'ADD'
        }))
      }
    }
  }, 
    [getInboxListRes]
  )


  
 
  
  return (
    <ChatLoadingContext.Provider value={chatLoading}>
      <Layout
        leftSide={
          <LeftSide
            inboxList={inboxList}
            limitsList={limitsList}
            />
        }
        center={
          <Center
            list={messagesList}
            loadMore={setMessagesPage}
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
    </ChatLoadingContext.Provider>
    
  )
}

export default ChatPage;