import styles from './History.module.scss';
import { FC } from 'react'
import Avatar from '@components/Avatar/Avatar';
import UserTitle from '@components/UserTitle/UserTitle';
import CopyableText from '@components/CopyableText/CopyableText';

interface I {
  man?: any,
  girl?:any,
  message?:any,
  operator?:any,
}

const History:FC<I> = ({
  man,
  girl,
  message,
  operator
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.part}>
        <div className={styles.title}>
          <UserTitle name='Username' age={20}/>
        </div>
        <div className={styles.avatar}>
          <Avatar isOnline/>
        </div>
        <div className={styles.id}>id<CopyableText>1232</CopyableText></div>
      </div>
      <div className={styles.body}>
        <div className={styles.message}>some message</div>
        <div className={styles.operator}></div>
      </div>
      <div className={styles.part}>
        <div className={styles.title}>
          <UserTitle name='Username' age={20}/>
        </div>
        <div className={styles.avatar}>
          <Avatar isOnline/>
        </div>
        <div className={styles.id}>id<CopyableText>1232</CopyableText></div>
      </div>
    </div>
  )
}

export default History;