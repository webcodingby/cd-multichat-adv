import styles from '../Card.module.scss';
import { FC } from 'react'
import img from '@assets/icons/stat-card-2.png';

const CardReps:FC<any> = () => {
  return (
    <div className={styles.wrapper} style={{background: 'linear-gradient(131deg, #7D6AF0 0%, #5C47D9 100%)'}}>
      <div className={styles.body}>
        <div className={styles.part}>
          <div className={styles.main}>Отправлено сообщений: 1660</div>
          <div className={styles.ex}>от прошлого мес. +15%</div>
        </div>
        <div className={styles.part}>
          <div className={styles.main}>Отправлено писем: 556</div>
          <div className={styles.ex}>от прошлого мес. -20%</div>
        </div>
      </div>
      <div className={styles.img}>
        <img src={img} alt="" />
      </div>
    </div>
  )
}

export default CardReps;