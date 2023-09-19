import { FC, memo, useEffect } from 'react'
import styles from './Message.module.scss';
import I from './types';
import getClassNames from '@utils/getClassNames';
import Avatar from '@components/Avatar/Avatar';
import { MS_MESSAGE_TYPES, messageType } from '@data/messageTypes';
import FancyboxWrapper from '@components/FancyboxWrapper/FancyboxWrapper';
import placeholder from '@assets/avatars/avatar-1.png'
import moment from 'moment';
import {BsCheck, BsCheckAll} from 'react-icons/bs'
import {FaSmileWink} from 'react-icons/fa';
import MessageStatus from "@components/MessageStatus/MessageStatus";
import { useInView } from 'react-intersection-observer';
import { useReadMessageMutation } from '@store/slices/apiSlice/apiSlice';
import { useAppSelector, useAppDispatch } from '@hooks/useReduxTypedHook';
import { main_updateCurrentUser, main_updateNewMessage } from '@store/slices/mainSlice/mainSlice';


const MessageComponent:FC<I> = ({
  avatar,
  body,
  type,
  isRead,
  isSelf,
  isSend,
  isOnline,
  id,
  updatedAt,
  createdAt,
  isShowAvatar,

  pureBody,
  userId
}) => {
  const {token, chatData} = useAppSelector(s => s.mainSlice)
  const {currentChatId} = chatData || {}
  const {inView, ref} = useInView({triggerOnce: true})
  const [readMessage, readMessageRes] = useReadMessageMutation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if(!isRead && inView && token && currentChatId && id) {
      readMessage({token, body: {chatId: currentChatId, messageId: id}})
    }
  }, [inView, isRead, token, currentChatId, id])

  useEffect(() => {
    const {data, isLoading, isSuccess} = readMessageRes
    if(isSuccess) {
      dispatch(main_updateNewMessage({
        chatId: currentChatId,
        body: {...pureBody, is_read_by_recepient: 1},
        type: 'UPDATE'
      }))
    }
  }, [readMessageRes])


  const messageDepType = (type: messageType) => {
    switch(type) {
      case MS_MESSAGE_TYPES.messageText:
        return (
          <div className={styles.bubble_in}>
            <div className={styles.text}>
              <p>
                {body?.text}
              </p>
            </div>
            <div className={styles.time}>{moment(updatedAt).format('hh:mm')}</div>
          </div>
        )
      case MS_MESSAGE_TYPES.messageWink:
        return (
          <div className={styles.bubble_in}>
            <div className={styles.wink}>
              <FaSmileWink/>
            </div>
            <div className={styles.time}>{moment(updatedAt).format('hh:mm')}</div>
          </div>
        )
      case MS_MESSAGE_TYPES.messageGift:
        return (
          <div className={styles.bubble_in}>
            <div className={styles.gifts}>
              {
                body?.gifts?.map((i:any, index: number) => (
                  <div className={styles.gift}>
                    <img src={i?.picture_url} alt=""/>
                  </div>
                ))
              }
            </div>
            <div className={styles.time}>{moment(updatedAt).format('hh:mm')}</div>
          </div>
        )
      case MS_MESSAGE_TYPES.messageSticker:
        return (
          <div className={styles.bubble_in}>
            <div className={styles.gifts}>
              <div className={styles.gift}>
                <img src={body?.sticker?.picture_url} alt=""/>
              </div>
            </div>
            <div className={styles.time}>{moment(updatedAt).format('hh:mm')}</div>
          </div>
        )
      case MS_MESSAGE_TYPES.messageImage:
        return (
          <div className={styles.bubble_in}>
            <div className={styles.media}>
              <FancyboxWrapper>
                <div className={styles.img}>
                  <a data-fancybox="gallery" href={body?.image_url} className={styles.item}>
                    <img src={body?.thumbnail_url} alt="" width={100} height={100}/>
                  </a>
                </div>
              </FancyboxWrapper>
            </div>
            <div className={styles.time}>{moment(updatedAt).format('hh:mm')}</div>
          </div>
        )
      default:
        return null;
    }
  }

  if(isSelf === 1) {
    return (
      <div className={getClassNames([styles.wrapper, styles.self])}>
        <div className={styles.in}>
          <div className={styles.body}>
            <div className={styles.status}>
              <MessageStatus
              status={isRead ? 'READ' : 'UNREAD'}
              />
              {/*{isRead ? <BsCheckAll color='var(--violet_1)'/> : <BsCheck color='var(--gray_1)'/>}*/}
            </div>
            <div className={styles.bubble}>
              {messageDepType(type)}
            </div>
          </div>
          <div className={styles.avatar}>
            {isShowAvatar && (
              <Avatar
                onClick={() => dispatch(main_updateCurrentUser(userId))}
                size={40}
                image={avatar}
                isOnline={isOnline}  
                isRound
                />
            )}
          </div>
        </div>
      </div>
    )
  }

  if(isSelf === 0) {
    return (
      <div className={styles.wrapper} ref={ref}>
        <div className={styles.in}>
          <div className={styles.avatar}>
            {isShowAvatar && (
              <Avatar
                size={40}
                image={avatar}
                isOnline={isOnline}
                isRound
                onClick={() => dispatch(main_updateCurrentUser(userId))}
                />
            )}
          </div>
          <div className={styles.body}>
            <div className={styles.bubble}>
              {messageDepType(type)}
            </div>
            <div className={styles.status}>
              {isRead ? <BsCheckAll color='var(--violet_1)'/> : <BsCheck color='var(--gray_1)'/>}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}
const Message = memo(MessageComponent)
export default Message;