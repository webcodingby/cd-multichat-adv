import styles from '../Card.module.scss';
import { FC } from 'react'
import img from '@assets/icons/stat-card-3.png';

interface I {
  balance?:any
}

const CardBalance:FC<I> = ({
  balance
}) => {
  return (
    <div className={styles.wrapper} style={{background: 'linear-gradient(133deg, #FF9C41 0%, #F3C03C 100%)'}}>
      <div className={styles.body}>
        <div className={styles.part}>
          <div className={styles.main}>Баланс Январь: $556</div>
          <div className={styles.ex}>от прошлого мес. +125%</div>
        </div>
        <div className={styles.part}>
          <div className={styles.main}>Баланс сегодня: 126%</div>
          <div className={styles.ex}>Разница от прошлого дня +126%</div>
        </div>
      </div>
      <div className={styles.img}>
        <img src={img} alt="" />
      </div>
    </div>
  )
}

export default CardBalance;