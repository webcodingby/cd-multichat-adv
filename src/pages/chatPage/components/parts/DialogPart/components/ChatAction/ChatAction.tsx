import { FC, useEffect, useState } from 'react'
import styles from './ChatAction.module.scss';
import Button from '@components/Button/Button';
import TextareaAutosize from 'react-textarea-autosize';
import { useNavigate } from 'react-router-dom';
import {AiOutlineSmile, AiOutlineGift, AiOutlineCamera} from 'react-icons/ai';
import apiSlice, { 
  useSendMediaMessageChatMutation, 
  useSendMessageMutation, 
  useSendStickerMutation,
  useSendGiftMutation,
  useSendLetterMutation,
  useCreateMessageChatMutation
} from '@store/slices/apiSlice/apiSlice';
import { useAppDispatch, useAppSelector } from '@hooks/useReduxTypedHook';
import getClassNames from '@utils/getClassNames';
import Gifts from './components/Gifts/Gifts';
import Stickers from './components/Stickers/Stickers';
import Media from './components/Media/Media';
import { Dropdown, message } from 'antd';
import OutsideClickHandler from 'react-outside-click-handler';
import { 
  main_updateChatDataMessageChats, 
  main_updateChatDataLetterChats,
  main_updateNewLetter,
  main_updateNewMessage,
  main_removeChatDataLimits
} from '@store/slices/mainSlice/mainSlice';


// interface I {
//   onUpdateMessage: (type: 'SEND' | 'READ' | 'GET') => any
// }


const ChatAction:FC<any> = ({
  onUpdateMessage
}) => {
  const navigate = useNavigate()
  const {chatData: {currentChatId, chatType}, createChatData} = useAppSelector(s => s.mainSlice)
  const {token} = useAppSelector(s => s.mainSlice)
  const dispatch = useAppDispatch()

  const [createMessageChat, createdChat] = useCreateMessageChatMutation()
  const [sendMessage, sendMessageRes] = useSendMessageMutation()
  const [sendMedia, sendMediaRes] = useSendMediaMessageChatMutation()
  const [sendSticker, sendStickerRes] = useSendStickerMutation()
  const [sendGift, sendGiftRes] = useSendGiftMutation()
  const [sendLetter, sendLetterRes] = useSendLetterMutation()



  const [mediaModal, setMediaModal] = useState(false)
  const [text, setText] = useState('')
  const [isFocused, setIsFocused] = useState(false)


  const [stickerPopup, setStickerPopup] = useState(false)
  const [giftPopup, setGiftPopup] = useState(false)

  const [loading, setLoading] = useState(false) 

  const onSendMessage = () => {
    if(token && text) {
      if(chatType === 'MAIL') {
        //ОТПРАВКА ПИСЬМА
      }
      if(chatType === 'CHAT') {
        if(createChatData && !currentChatId) {
          setLoading(true)
          createMessageChat({
            token,
            body: createChatData
          }).then((res:any) => {
            if(res?.data?.id) {
              dispatch(main_removeChatDataLimits({id: createChatData?.operator_chat_limit_id}))
              sendMessage({
                token,
                id: res?.data?.id,
                body: {
                  text
                }
              })
              .finally(() => setLoading(false))
            }
          })
        }
        if(currentChatId) {
          setLoading(true)
          sendMessage({
            token,
            id: currentChatId,
            body: {
              text
            }
          })
          .finally(() => setLoading(false))
        } 
      }
    }
  }

  

  const onSendSticker = (sticker: string | number) => {
    if(token && currentChatId) {
      if(chatType === 'CHAT') {
        if(createChatData) {
          setLoading(true)
        } else {
          setLoading(true)
          sendSticker({
            token, 
            body: {
              id: currentChatId, 
              sticker_id: sticker
            }
          })
          .finally(() => setLoading(false))
        }
      }  
    }
  }

  const onSendGift = (gift: number | string) => {
    if(token && currentChatId) {
      if(chatType === 'CHAT') {
        if(createChatData) {
          
        } else {
          setLoading(true)
          sendGift({
            token,
            body: {
              id: currentChatId,
              gift_id: gift
            }
          })
          .finally(() => setLoading(false))
        }
      }
    }
  }

  const onSendMedia = (selected: any[]) => {
    if(token && currentChatId && selected?.length > 0) {
      if(chatType === 'CHAT') {
        if(createChatData) {
          
        } else {
          sendMedia({
            token,
            id: currentChatId,
            body: {
              thumbnail_url: selected[0]?.image_url,
              image_url: selected[0]?.image_url
            }
          })
        }
      }
      if(chatType === 'MAIL') {
        sendLetter({
          token,
          id: currentChatId,
          body: {
            text,
            images: selected?.map(i => i?.id)
          }
        })
      }
    } 
  }

  useEffect(() => {
    const {data, isSuccess, isLoading} = sendStickerRes
    if(!isLoading && data && isSuccess) {
      const messageBody = data?.last_message
      const dialogBody = data
      const type = data?.model_type == 'chat' ? 'CHAT' : 'MAIL'

      if(type === 'CHAT') {
        dispatch(main_updateChatDataMessageChats(dialogBody))
        dispatch(main_updateNewMessage({
          chatId: dialogBody?.id, 
          body: messageBody,
          type: 'NEW'
        }))
      }
      if(type === 'MAIL') {

      }
    }
  }, [sendStickerRes])

  useEffect(() => {
    const {data, isSuccess, isLoading} = sendGiftRes
    if(!isLoading && data && isSuccess) {
      
      const messageBody = data?.last_message
      const dialogBody = data
      const type = data?.model_type == 'chat' ? 'CHAT' : 'MAIL'

      if(type === 'CHAT') {
        dispatch(main_updateChatDataMessageChats(dialogBody))
        dispatch(main_updateNewMessage({
          chatId: dialogBody?.id, 
          body: messageBody,
          type: 'NEW'
        }))
      }
      if(type === 'MAIL') {

      }
    }
  }, [sendGiftRes])

  useEffect(() => {
    const {data, isSuccess, isLoading} = sendMediaRes
    if(data && isSuccess && !isLoading) {
      const messageBody = data?.last_message
      const dialogBody = data
      const type = data?.model_type == 'chat' ? 'CHAT' : 'MAIL'

      if(type === 'CHAT') {
        dispatch(main_updateChatDataMessageChats(dialogBody))
        dispatch(main_updateNewMessage({
          chatId: dialogBody?.id, 
          body: messageBody,
          type: 'NEW'
        }))
      }
      if(type === 'MAIL') {

      }
    }
  }, [sendMediaRes])

  useEffect(() => {
    const {data, isLoading, isSuccess } = sendMessageRes
    if(data && isSuccess && !isLoading) {
      if(data?.id) {
        const messageBody = data?.last_message
        const dialogBody = data
        const type = data?.model_type == 'chat' ? 'CHAT' : 'MAIL'

        navigate(`/chat?chatType=CHAT&chatId=${dialogBody?.id}&selfId=${dialogBody?.self_user?.id}`)

        if(type === 'CHAT') {
          dispatch(main_updateChatDataMessageChats(dialogBody))
          dispatch(main_updateNewMessage({
            chatId: dialogBody?.id, 
            body: messageBody,
            type: 'NEW'
          }))
        }
        if(type === 'MAIL') {

        }
      } 
      if(data?.error === 'NO_LIMIT') {
        message.error('У вас недостаточно лимита')
      }
      
    }
  }, [sendMessageRes])

  useEffect(() => {
    const {data, isLoading, isSuccess} = sendLetterRes
    if(data && !isLoading && isSuccess) {
      //
    }
  }, [sendLetterRes])

  const onEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if(e.keyCode === 13 && !(e.keyCode == 13 && e.shiftKey)) {
        e.preventDefault()
        if(text) {
            onSendMessage()
        }
    }
  }

  return (
    <div className={styles.wrapper}>
      <Media
        onSendMedia={onSendMedia}
        open={mediaModal}
        onCancel={() => setMediaModal(false)}
        />
      <div className={styles.body}>
        <div className={getClassNames([styles.main, isFocused && styles.focused])}>
          <div className={styles.field}>
            <TextareaAutosize
              onKeyDown={onEnter}
              maxRows={10}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={getClassNames([styles.area, 'custom-scroll'])}
              value={text}
              onChange={e => setText(e.target.value)}
              />
          </div>
          <div className={styles.ex}>
            {
              chatType === 'CHAT' && (
                <>
                  <Dropdown
                    open={stickerPopup}
                    placement={'topLeft'}
                    overlay={
                      <OutsideClickHandler
                        onOutsideClick={() => setStickerPopup(false)}
                        >
                        <Stickers
                          isOpen={stickerPopup}
                          onSend={onSendSticker}
                          onClose={() => setStickerPopup(false)}
                          />
                      </OutsideClickHandler>
                    }
                    >
                    <button onClick={() => setStickerPopup(s => !s)} className={styles.btn}>
                      <AiOutlineSmile/>
                    </button>
                  </Dropdown>
                  <Dropdown
                    placement='topLeft'
                    open={giftPopup}
                    overlay={
                      <OutsideClickHandler
                        onOutsideClick={() => setGiftPopup(false)}
                        >
                        <Gifts
                          isOpen={giftPopup}
                          onSend={onSendGift}
                          onClose={() => setStickerPopup(false)}
                          />
                      </OutsideClickHandler>
                    }
                    >
                    <button onClick={() => setGiftPopup(s => !s)} className={styles.btn}>
                      <AiOutlineGift/>
                    </button>
                  </Dropdown>
                </>
              )
            }
            <button onClick={() => setMediaModal(true)} className={styles.btn}>
              <AiOutlineCamera/>  
            </button>
          </div>
        </div>
        <div className={styles.action}>
          <Button
            disabled={!(text)}
            onClick={onSendMessage}
            isLoading={loading}
            >
            Отправить
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ChatAction;