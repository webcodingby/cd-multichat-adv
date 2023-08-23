import styles from './MessagesDialogItem.module.scss';
import { FC, ReactNode } from 'react'

interface I {
  children?: ReactNode
}

const MessagesDialogItem:FC<I> = ({children}) => {
  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  )
}

export default MessagesDialogItem;