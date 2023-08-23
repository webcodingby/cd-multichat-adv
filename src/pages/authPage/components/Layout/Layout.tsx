import styles from './Layout.module.scss';

import { FC, ReactNode } from 'react'

const Layout:FC<{children?:ReactNode}> = ({children}) => {
  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  )
}

export default Layout;