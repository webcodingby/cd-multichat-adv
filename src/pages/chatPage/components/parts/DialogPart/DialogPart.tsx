import styles from './DialogPart.module.scss';
import { FC, useState} from 'react'
import getClassNames from '../../../../../utils/getClassNames';
import DialogUsers from './components/DialogUsers/DialogUsers';
import Chat from './components/Chat/Chat';
import ChatAction from './components/ChatAction/ChatAction';


const DialogPart:FC<any> = () => {
  const [chatActionHeight, setChatActionHeight] = useState<number>(0)
  const [dialogUsersHeight, setDialogUsersHeight] = useState<number>(0)
  
  return (
    <div className={styles.wrapper}>
      <div className={styles.users}>
        <DialogUsers/>
      </div>
      <div className={styles.chat}>
        <Chat/>
      </div>
      <div className={styles.action}>
        <ChatAction/>
      </div>
    </div>
  )
}

export default DialogPart;