import { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@hooks/useReduxTypedHook';
import getSocketChannels, { type pusherConfigType } from '@utils/getSocketChannels';
import { BASE_WS_DOMAIN } from '@data/endpoints';
import { BASE_DOMAIN } from '@data/endpoints';
import { useGetSelfQuery } from '@store/slices/apiSlice/apiSlice';
import { Cookies } from 'typescript-cookie';
import { cookiesStorageKeys } from '@utils/storageKeys';
import { main_updateAdminData, main_updateSocket } from '@store/slices/mainSlice/mainSlice';
import WS_EVENTS from '@data/socketEvents';
const {ADMIN} = cookiesStorageKeys;
const AppProvider:FC<{ children?: React.ReactNode }> = ({
    children
}) => {
  const dispatch = useAppDispatch()
  const {token, socket, adminData} = useAppSelector(s => s.mainSlice)
  const [pusherConfig, setPusherConfig] = useState<pusherConfigType | null>(null)
  const userDataRes = useGetSelfQuery(token)
  

  useEffect(() => {
    if(token) {
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

  useEffect(() => {
    if(userDataRes.isSuccess && userDataRes.data) {
      const d = Cookies.get(ADMIN)
      const userData:any = typeof d === 'string' ? JSON.parse(d) : null
      if(userData !== null) {
        const p = {
          ...userData,
          id: userDataRes?.data
        }
        Cookies.set(ADMIN, JSON.stringify(p))
        dispatch(main_updateAdminData(p))
      }
    }
  }, [userDataRes])

  useEffect(() => {
    if(adminData && typeof adminData === 'string' && !socket && pusherConfig) {
      const admin = JSON.parse(adminData)
      if(admin?.id) {
        console.log(admin)
        console.log(pusherConfig)
        const channels = getSocketChannels(pusherConfig).private(`App.User.${admin?.id}`);
        
        channels.subscribed(() => {
          // console.log('[WS]: Connected')
          dispatch(main_updateSocket(channels))
        })
      }
    }
  }, 
    [pusherConfig, adminData, socket]
  )

  useEffect(() => {
    if(socket) {
      socket.listen(WS_EVENTS.newChatMessage, (data:any) => {
        console.log(data)
      })
    }
  }, [socket])

  return (
    <>{ children }</>
  )
}

export default AppProvider;