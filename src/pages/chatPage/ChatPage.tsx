import {FC, useEffect, useState, createContext} from 'react'
import {useAppDispatch, useAppSelector} from '@hooks/useReduxTypedHook';
import {useLocation, useNavigate, useSearchParams} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import LeftSide from './components/LeftSide/LeftSide';
import Center from './components/Center/Center';
import RightSide from './components/RightSide/RightSide';
import {
  main_updateChatType,
  main_updateCreateChatData,
  main_updateCurrentChatId,
  main_updateDialogUsers
} from '@store/slices/mainSlice/mainSlice';
import ROUTES from '@data/routes';

export const ChatLoadingContext = createContext(false)

const ChatPage: FC<any> = () => {
  const dispatch = useAppDispatch()
  const {token, chatData} = useAppSelector(s => s.mainSlice)
  const {pathname} = useLocation()
  const [params] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (pathname === '/') navigate(ROUTES.chatMessagePage, {replace: true})
  }, [pathname])

  useEffect(() => {
    if (params?.get('chatType') === 'MAIL' || params?.get('chatType') === 'CHAT') {
      const type = params?.get('chatType')
      dispatch(main_updateChatType(type))
      dispatch(main_updateDialogUsers(null))
    } else {
      dispatch(main_updateChatType(null))
    }
  }, [params?.get('chatType')])

  useEffect(() => {
    if (params?.get('chatId') && typeof params?.get('chatId') === 'string') {
      dispatch(main_updateCurrentChatId(params?.get('chatId')))
    } else {
      dispatch(main_updateCurrentChatId(null))
    }
  }, [params?.get('chatId')])

  return (
    <Layout
      leftSide={
        <LeftSide
        />
      }
      center={
        <Center
        />
      }
      rightSide={
        <RightSide
        />
      }
    />
  )
}

export default ChatPage;