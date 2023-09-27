import styles from '../Card.module.scss';
import { FC } from 'react'
import img from '@assets/icons/stat-card-1.png';

interface I {
  totalAncet?: number,
  ancetInWork?: number
}

const CardAnkets:FC<I> = ({
  totalAncet,
  ancetInWork
}) => {
  return (
    <div className={styles.wrapper} style={{background: 'linear-gradient(132deg, #3CA974 0%, #55DEA9 100%)'}}>
      <div className={styles.body}>
        <div className={styles.part}>
          <div className={styles.main}>Всего Анкет: {totalAncet ?? '-'}</div>
          {/* <div className={styles.ex}>от прошлого мес. +5%</div> */}
        </div>
        <div className={styles.part}>
          <div className={styles.main}>Работает Анкет: {ancetInWork ?? '-'}</div>
        </div>
      </div>
      <div className={styles.img}>
        <img src={img} alt="" />
      </div>
    </div>
  )
}

export default CardAnkets;