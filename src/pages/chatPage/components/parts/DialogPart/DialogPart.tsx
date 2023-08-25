import styles from './DialogPart.module.scss';
import { FC, useState, useContext} from 'react'
import getClassNames from '../../../../../utils/getClassNames';
import DialogUsers from './components/DialogUsers/DialogUsers';
import Chat from './components/Chat/Chat';
import ChatAction from './components/ChatAction/ChatAction';
import { ChatLoadingContext } from '@pages/chatPage/ChatPage';
import { MoonLoader } from 'react-spinners';


interface I {
  list?:any[],
  loadMore?:(...args:any[]) => any,
  updateMessages?: (...args:any[]) => any,
  updateChats?: (...args:any[]) => any
}

const DialogPart:FC<I> = ({
  list = [],
  loadMore
}) => {
  const isLoading = useContext(ChatLoadingContext)

  return (
    <div className={styles.wrapper}>
      <div className={styles.users}>
        <DialogUsers/>
      </div>
      <div className={styles.chat}>
        {
          isLoading ? (
            <div className={styles.loader}>
              <MoonLoader/>
            </div>
          ) : (
            <Chat
              list={list}
              loadMore={loadMore}
              />
          )
        }

      </div>
      <div className={styles.action}>
        <ChatAction
          // updateChats={updateChats}
          // updateMessages={updateMessages}
          />
      </div>
    </div>
  )
}

export default DialogPart;