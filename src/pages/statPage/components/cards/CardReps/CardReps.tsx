import styles from '../Card.module.scss';
import { FC } from 'react'
import img from '@assets/icons/stat-card-2.png';

interface I {
  totalSendMessages?: number,
  totalSendLetters?: number
}

const CardReps:FC<I> = ({
  totalSendMessages,
  totalSendLetters
}) => {
  return (
    <div className={styles.wrapper} style={{background: 'linear-gradient(131deg, #7D6AF0 0%, #5C47D9 100%)'}}>
      <div className={styles.body}>
        <div className={styles.part}>
          <div className={styles.main}>Отправлено сообщений: {totalSendMessages ?? '-'}</div>
        </div>
        {/* <div className={styles.part}>
          <div className={styles.main}>Отправлено писем: {totalSendLetters ?? '-'}</div>
        </div> */}
      </div>
      <div className={styles.img}>
        <img src={img} alt="" />
      </div>
    </div>
  )
}

export default CardReps;