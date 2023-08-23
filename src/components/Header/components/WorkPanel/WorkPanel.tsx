import styles from './WorkPanel.module.scss';
import { FC } from 'react'
import Button from '../../../Button/Button';

const WorkPanel:FC<any> = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.item}><span>В работе: </span><span>05:35</span></div>
        <div className={styles.item}><span>Заработок: </span><span>$15</span></div>
      </div>
      <div className={styles.action}>
        <div className={styles.btn}>
          <Button
            variant={'danger'}
            style={{fontWeight: 700}}
            >СТОП</Button>
        </div>
        <div className={styles.btn}>
          <Button
            variant={'green'}
            style={{fontWeight: 700}}
            >
            СТАРТ</Button>
        </div>
      </div>
    </div>
  )
}

export default WorkPanel;