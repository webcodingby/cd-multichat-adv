import { FC, useEffect, useState } from 'react'
import styles from './ChatAction.module.scss';
import Button from '@components/Button/Button';
import TextareaAutosize from 'react-textarea-autosize';
import {AiOutlineSmile, AiOutlineGift, AiOutlineCamera} from 'react-icons/ai';
import { useSendMessageMutation } from '@store/slices/apiSlice/apiSlice';
import { useAppSelector } from '@hooks/useReduxTypedHook';
import { useSearchParams } from 'react-router-dom';
import getClassNames from '@utils/getClassNames';

const ChatAction:FC<any> = () => {
  const [params] = useSearchParams()
  const [chatId, setChatId] = useState<any>()
  const {token} = useAppSelector(s => s.mainSlice)
  const [sendMessage, sendMessageRes] = useSendMessageMutation()
  const [text, setText] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if(params?.get('chatId')) setChatId(params?.get('chatId'))
  }, [params?.get('chatId')])

  const onSendMessage = () => {
    if(chatId && token && text) {
      sendMessage({
        token,
        id: chatId,
        body: {
          text
        }
      })
    }
  }


  useEffect(() => {
    setLoading(sendMessageRes.isLoading)
    if(sendMessageRes.data && sendMessageRes.isSuccess) {
      console.log(sendMessageRes.data)
    }
  }, [sendMessageRes])

  return (
    <div className={styles.wrapper}>
      <div className={styles.body}>
        <div className={getClassNames([styles.main, isFocused && styles.focused])}>
          <div className={styles.field}>
            <TextareaAutosize
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={styles.area}
              value={text}
              onChange={e => setText(e.target.value)}
              />
          </div>
          <div className={styles.ex}>
            <button className={styles.btn}>
              <AiOutlineSmile/>
            </button>
            <button className={styles.btn}>
              <AiOutlineGift/>
            </button>
            <button className={styles.btn}>
              <AiOutlineCamera/>
            </button>
          </div>
        </div>
        <div className={styles.action}>
          <Button
            disabled={!text}
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