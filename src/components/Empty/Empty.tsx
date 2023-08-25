import styles from './Empty.module.scss';
import { FC } from 'react'
import I from './types';
import {VscEmptyWindow} from 'react-icons/vsc';

const Empty:FC<I> = ({
  icon = <VscEmptyWindow/>,
  title,
  text = 'Тут пусто',
  style
}) => {
  return (
    <div style={style} className={styles.wrapper}>
      {icon && <div className={styles.icon}>{icon}</div>}
      {title && <div className={styles.title}>{title}</div>}
      {text && <div className={styles.text}>{text}</div>}
    </div>
  )
}

export default Empty;