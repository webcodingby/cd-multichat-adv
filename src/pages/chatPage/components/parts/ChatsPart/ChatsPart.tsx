import styles from './ChatsPart.module.scss';
import { FC, useEffect } from 'react'
import { useInView } from 'react-intersection-observer';
import ChatItem from './components/ChatItem/ChatItem';
import getClassNames from '@utils/getClassNames';
import { useSearchParams } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';

interface I {
  list:any[],
  loadMore: (...args:any[]) => any
}

const ChatsPart:FC<I> = ({
  loadMore,
  list
}) => {
  const {inView, ref} = useInView()
  const [params] = useSearchParams()

  useEffect(() => {
    inView && loadMore((s:number) => s + 1)
  }, 
    [inView, loadMore]
  )

  return (
    <div className={getClassNames([styles.wrapper, 'custom-scroll'])}>
      {
        list.map((i, index) => (
          <ChatItem 
            isActive={params.get('chatId') == i.id}
            id={i.id}
            created_at={i.created_at}
            updated_at={i.updated_at}
            limits={{
              avialable_limit: i.available_limit,
              max_limit: i.max_limit
            }}
            selfUser={i?.self_user}
            otherUser={i?.other_user}
            key={index}/>
        ))
      }
      {
        list?.length > 0 && <div className={styles.loader} ref={ref}>
          {/* <PulseLoader color={"var(--violet_1)"}/> */}
          </div>
      }
      
    </div>
  )

}

export default ChatsPart;