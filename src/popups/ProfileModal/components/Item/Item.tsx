import styles from './Item.module.scss';

import { FC, PropsWithChildren } from 'react'

interface I {
  label?: string
}

const Item:FC<PropsWithChildren & I> = ({children, label}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>{label}</div>
      <div className={styles.body}>
        {children}
      </div>
    </div>
  )
}

export default Item;