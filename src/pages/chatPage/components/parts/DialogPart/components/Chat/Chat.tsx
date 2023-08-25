import { FC } from 'react'
import styles from './Chat.module.scss';
import ChatMessages from './components/ChatMessages/ChatMessages';

interface I {
  list?:any[],
  loadMore?: (...args:any[]) => any
}

const Chat:FC<I> = ({
  list = [],
  loadMore
}) => {

  return (
    <div className={styles.wrapper}>
      <ChatMessages
        loadMore={loadMore}
        list={list}
        />
    </div>
  )
}

export default Chat;