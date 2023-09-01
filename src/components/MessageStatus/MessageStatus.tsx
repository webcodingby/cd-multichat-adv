import styles from './MessageStatus.module.scss';
import {CSSProperties, FC} from 'react';
import {BiCheck, BiCheckDouble} from "react-icons/bi";
import getClassNames from "@utils/getClassNames";

interface I {
  status?: 'READ' | 'UNREAD',
  style?: CSSProperties
}

const MessageStatus: FC<I> = (
  {
    status = 'UNREAD',
    style
  }
) => {

  return (
    <div style={style} className={getClassNames([styles.wrapper, status === 'READ' && styles.read])}>
      {status === 'READ' && <div className={styles.icon}><BiCheckDouble/></div>}
      {status === 'UNREAD' && <div className={styles.icon}><BiCheck/></div>}
    </div>
  )
}

export default MessageStatus;