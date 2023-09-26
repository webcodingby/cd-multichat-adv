import styles from '../Card.module.scss';
import { FC } from 'react'
import img from '@assets/icons/stat-card-4.png';


interface I {
  avgAnswerTime?: string,
  avgIdleTime?: string
}

const CardAvg:FC<I> = ({
  avgAnswerTime,
  avgIdleTime
}) => {
  return (
    <div className={styles.wrapper} style={{background: 'linear-gradient(127deg, #199BCB 0%, #4BB5DD 100%)'}}>
      <div className={styles.body}>
        <div className={styles.part}>
          <div className={styles.main}>Среднее время ответа: {avgAnswerTime}</div>
          <div className={styles.ex}>Разница от прошлого мес. +3%</div>
        </div>
        <div className={styles.part}>
          <div className={styles.main}>Среднее время простоя: {avgIdleTime}</div>
          <div className={styles.ex}>Разницаот прошлого мес. -20%</div>
        </div>
      </div>
      <div className={styles.img}>
        <img src={img} alt="" />
      </div>
    </div>
  )
}

export default CardAvg;