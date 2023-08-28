import { FC, useEffect, useState } from 'react'
import styles from './ChatAction.module.scss';
import Button from '@components/Button/Button';
import TextareaAutosize from 'react-textarea-autosize';
import {AiOutlineSmile, AiOutlineGift, AiOutlineCamera} from 'react-icons/ai';
import apiSlice, { 
  useSendMediaMessageChatMutation, 
  useSendMessageMutation, 
  useSendStickerMutation,
  useSendGiftMutation,
  useSendLetterMutation,
  useCreateMessageChatMutation
} from '@store/slices/apiSlice/apiSlice';
import { useAppSelector } from '@hooks/useReduxTypedHook';
import getClassNames from '@utils/getClassNames';
import Gifts from './components/Gifts/Gifts';
import Stickers from './components/Stickers/Stickers';
import Media from './components/Media/Media';
import { Dropdown } from 'antd';
import OutsideClickHandler from 'react-outside-click-handler';
import { 
  main_updateChatDataMessageChats, 
  main_updateChatDataLetterChats,
  main_updateNewLetter,
  main_updateNewMessage
} from '@store/slices/mainSlice/mainSlice';



const ChatAction:FC<any> = () => {
  const {chatData: {currentChatId, chatType}, createChatData} = useAppSelector(s => s.mainSlice)
  const {token} = useAppSelector(s => s.mainSlice)

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
    if(currentChatId && token && text) {
      if(chatType === 'MAIL') {
        sendLetter({
          token,
          id: currentChatId,
          body: {
            text
          }
        })
      }
      if(chatType === 'CHAT') {
        if(createChatData) {
          //
        } else {
          setLoading(true)
          if(createChatData) {
            // createMessageChat({
            //   token,
            //   body: createChatData
            // })
          } else {
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
  }

  const onSendSticker = (sticker: string | number) => {
    if(token && currentChatId) {
      if(chatType === 'CHAT') {
        if(createChatData) {
          //
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
      //
    }
  }, [sendStickerRes])

  useEffect(() => {
    const {data, isSuccess, isLoading} = sendGiftRes
    if(!isLoading && data && isSuccess) {
      //
    }
  }, [sendGiftRes])

  useEffect(() => {
    const {data, isSuccess, isLoading} = sendMediaRes
    if(data && isSuccess && !isLoading) {
      //
    }
  }, [sendMediaRes])

  useEffect(() => {
    const {data, isLoading, isSuccess } = sendMessageRes
    if(data && isSuccess && !isLoading) {
      //
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
            disabled={!(text && currentChatId)}
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