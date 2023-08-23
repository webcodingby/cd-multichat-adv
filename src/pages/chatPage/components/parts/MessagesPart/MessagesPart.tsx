import getClassNames from '../../../../../utils/getClassNames';
import styles from './MessagesPart.module.scss';
import { FC, useEffect } from 'react'
import MessagesDialogItem from './components/MessagesDialogItem/MessagesDialogItem';
import { useInView } from 'react-intersection-observer';


interface I {
  list:any[],
  loadMore: (...args:any[]) => any
}

const MessagesPart:FC<I> = ({list, loadMore}) => {
  const {inView, ref} = useInView()

  useEffect(() => {
    inView && loadMore((s:number) => s + 1)
  }, [inView, loadMore])

  return (
    <div className={getClassNames([styles.wrapper, 'custom-scroll'])}>
      {
        list.map((i, index) => (
          <MessagesDialogItem key={index}>{i?.id}</MessagesDialogItem>
        ))
      }
      {
        list?.length > 0 && <div style={{border: '1px solid red'}} ref={ref}/>
      }
      
    </div>
  )
}

export default MessagesPart;