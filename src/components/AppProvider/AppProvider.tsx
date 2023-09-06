import {FC, useEffect, useState, useRef} from 'react'
import {useAppDispatch, useAppSelector} from '@hooks/useReduxTypedHook';
import getSocketChannels, {type pusherConfigType} from '@utils/getSocketChannels';
import {BASE_WS_DOMAIN, TEST_DOMAIN, TEST_WS_DOMAIN} from '@data/endpoints';
import {BASE_DOMAIN} from '@data/endpoints';
import apiSlice, {
  useGetInboxListQuery,
  useGetLetterChatsQuery,
  useGetLimitsListQuery,
  useGetMessageChatsQuery,
  useGetSelfQuery
} from '@store/slices/apiSlice/apiSlice';
import {Cookies} from 'typescript-cookie';
import {cookiesStorageKeys} from '@utils/storageKeys';
import {
  main_addChatDataLetterChats,
  main_addChatDataMessageChats,
  main_initChatDataInbox,
  main_initChatDataLetterChats,
  main_initChatDataLimits,
  main_initChatDataMessageChats,
  main_updateAdminData,
  main_updateChatDataInbox,
  main_updateChatDataLetterChats,
  main_updateChatDataMessageChats,
  main_updateNewMessage,
  main_updateSocket,
} from '@store/slices/mainSlice/mainSlice';
import WS_EVENTS from '@data/socketEvents';
import notify from '@utils/notify';
import PUSH_SOUND from '@assets/audio/push-sound.mp3';
import LIMIT_SOUND from '@assets/audio/limit-sound.mp3';
import * as L from 'lodash';

const {ADMIN} = cookiesStorageKeys;

const AppProvider: FC<{ children?: React.ReactNode }> = ({
  children
}) => {
  const dispatch = useAppDispatch()
  const {
    token,
    socket,
    adminData,
    chatData,

    messageChatsPage,
    letterChatPage,
    inboxPage,
    historyPage
  } = useAppSelector(s => s.mainSlice)
  const {currentChatId, limits} = chatData || {}
  const [pusherConfig, setPusherConfig] = useState<pusherConfigType | null>(null)
  const pushRef = useRef<HTMLAudioElement>(null)
  const limitRef = useRef<HTMLAudioElement>(null)
  const [oldLimits, setOldLimits] = useState<any[]>([])

  const [getUserData] = apiSlice.endpoints.getSelf.useLazyQuery()

  const [getMessageChats] = apiSlice.endpoints.getMessageChats.useLazyQuery()
  const [getLetterChats] = apiSlice.endpoints.getLetterChats.useLazyQuery()
  const [getLimits, limitsRes] = apiSlice.endpoints.getLimitsList.useLazyQuery()
  const [getInbox] = apiSlice.endpoints.getInboxList.useLazyQuery()

  //
  const [getStatAnkets] = apiSlice.endpoints?.getStatMessageCountOperatorAnket.useLazyQuery({pollingInterval: 1800000})
  const [getStatMessages] = apiSlice.endpoints?.getStatMessageCount.useLazyQuery({pollingInterval: 1800000})

  useEffect(() => {
    setOldLimits(limits?.map(i => i?.id))
  }, [limits])

  //create pusher config (ws)
  useEffect(() => {
      if (token) {
        setPusherConfig({
          key: 's3cr3t',
          wsHost: BASE_WS_DOMAIN,
          authEndpoint: BASE_DOMAIN + 'broadcasting/auth',
          cluster: 'mt1',
          encrypted: true,
          forceTLS: false,
          wsPort: 6001,
          wssPort: 6001,
          disableStats: true,
          enabledTransports: ['ws', 'wss'],
          auth: {
            headers: {
              Authorization: 'Bearer ' + token,
            }
          }
        })
      }
    },
    [token]
  )

  //create connection to ws
  useEffect(() => {
      if (adminData && !socket && pusherConfig) {
        if (adminData?.id) {
          const channels = getSocketChannels(pusherConfig).private(`App.User.${adminData?.id}`);
          channels.subscribed(() => {
            console.log('[WS]: Connected')
            dispatch(main_updateSocket(channels))
          })
          channels.error(() => {
            console.log('[WS]: Disconnected')
            dispatch(main_updateSocket(null))
          })
        }
      }
    },
    [pusherConfig, adminData, socket]
  )

  //listen ws after connection
  useEffect(() => {
    if (socket) {
      socket.listen(WS_EVENTS.newChatMessage, (data: any) => {
        notify('[WS]: New Message', 'INFO')
        pushRef?.current && pushRef?.current?.play()
        //тело сообщения
        const message: any = {}

        //элемент в чатлисте
        const chat: any = {}

        dispatch(main_updateChatDataMessageChats(chat))
        // dispatch(main_updateChatDataMessagesStoreElement({
        //   id: chat?.id,
        //   message: message
        // }))
        dispatch(main_updateNewMessage({chatId: chat?.id, body: message}))
      })

      socket.listen(WS_EVENTS.newChatLetter, (data: any) => {
        notify('[WS]: New Letter', 'INFO')
        pushRef?.current && pushRef?.current?.play()
        //тело сообщения
        const message: any = {}

        //элемент в чатлисте
        const chat: any = {}

        dispatch(main_updateChatDataLetterChats(chat))
        // dispatch(main_updateChatDataLettersStoreElement({
        //   id: chat?.id,
        //   message: message
        // }))
      })

      socket.listen(WS_EVENTS.readChatMessage, (data: any) => {
        notify('[WS]: Message Read', 'INFO')
        const type: 'MAIL' | 'CHAT' | null = null

        //тело сообщения
        const message: any = {}

        //элемент в чатлисте
        const chat: any = {}

        if (type === 'CHAT') {
          dispatch(main_updateChatDataMessageChats(chat))
          // dispatch(main_updateChatDataMessagesStoreElement({
          //   id: chat?.id,
          //   message: message
          // }))
        }
        if (type === 'MAIL') {
          dispatch(main_updateChatDataLetterChats(chat))
          // dispatch(main_updateChatDataLettersStoreElement({
          //   id: chat?.id,
          //   message: message
          // }))
        }

      })

    }

    return () => {
      socket?.stopListening(WS_EVENTS.newChatMessage)
      socket?.stopListening(WS_EVENTS.newChatLetter)
      socket?.stopListening(WS_EVENTS.readChatMessage)
    }
  }, [socket])

  //get chat data
  useEffect(() => {
    if (token) {
      getMessageChats({token, body: {page: 1}}).then(res => {
        const {isSuccess, data} = res;
        if (data && isSuccess) {
          dispatch(main_initChatDataMessageChats(data?.data))
        }
      })
      getLetterChats({token, body: {page: 1}}).then(res => {
        const {isSuccess, data} = res;
        if (data && isSuccess) {
          dispatch(main_initChatDataLetterChats(data?.data))
        }
      })
      // getLimits({token, body: {page: 1}}).then(res => {
      //   const {isSuccess, data} = res;
      //   if(data && isSuccess) {
      //     console.log(data)
      //     // setOldLimits(data?.data?.map((i:any) => i?.id))
      //     // dispatch(main_initChatDataLimits(data?.data))
      //   }
      // })
      getInbox({token, body: {page: 1}}).then(res => {
        const {isSuccess, data} = res
        console.log(data)
        if (data && isSuccess) {
          dispatch(main_initChatDataInbox(data?.data))
        }
      })
      getUserData(token).then(res => {
        const {isSuccess, data} = res
        console.log(res?.data)
        const d = Cookies.get(ADMIN)
        const userData: any = typeof d === 'string' ? JSON.parse(d) : null
        if (data !== null && isSuccess) {
          const userD = {
            id: res?.data?.id,
            role: res?.data?.roles[0]?.name,
            email: res?.data?.email,
            name: res?.data?.name
          }
          Cookies.set(ADMIN, JSON.stringify(userD))
          dispatch(main_updateAdminData(userD))
        }
      })
      // getStatAnkets({token}).then(res => {
      //   const {data, isSuccess} = res
        
      // })
      // getStatMessages({token}).then(res => {
      //   const {data, isSuccess} = res
      //   console.log(data)
      // })
    }
  }, [token])

  const getLimitsFunc = () => {
    if(token) {
      getLimits({token, body: {page: 1}}).then(res => {
        const {data, isLoading, isSuccess} = res
        if(data && !isLoading && isSuccess) {
          setOldLimits(data?.data?.map((i:any) => i?.id))
          dispatch(main_initChatDataLimits(data?.data))
        }
      })
    }
  }

  useEffect(() => {
    let tm:any;
    if(token) {
      tm = setInterval(getLimitsFunc, 15000)
    }
    return () => {
      clearInterval(tm)
    }
  }, [token])

  // useEffect(() => {
  //   if (limits?.length > 0) {
  //     const dif = L.difference(limits?.map(i => i?.id), oldLimits)
  //     if (dif?.length > 0 && limitRef?.current) {
  //       limitRef?.current?.play()
  //     }
  //   }
  // }, [limits])

  useEffect(() => {
    if (messageChatsPage > 1 && token) {
      getMessageChats({token, body: {page: messageChatsPage}}).then(res => {
        if (res?.data?.data?.length > 0) {
          dispatch(main_addChatDataMessageChats(res?.data?.data))
        }
      })
    }
  }, [messageChatsPage, token])

  useEffect(() => {
    if (letterChatPage > 1 && token) {
      getLetterChats({token, body: {page: letterChatPage}}).then(res => {
        if (res?.data?.data?.length > 0) {
          dispatch(main_addChatDataLetterChats(res?.data?.data))
        }
      })
    }
  }, [letterChatPage, token])

  return (
    <>
      <audio src={PUSH_SOUND} ref={pushRef}/>
      <audio src={LIMIT_SOUND} ref={limitRef}/>
      {children}
    </>
  )
}

export default AppProvider;