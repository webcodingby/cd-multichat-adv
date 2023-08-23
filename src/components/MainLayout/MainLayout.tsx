import styles from './MainLayout.module.scss';
import { FC, ReactNode } from 'react'
import Header from '../Header/Header';
import { useLocation } from 'react-router-dom';
const MainLayout:FC<{ children?: ReactNode }> = ({ children }) => {
  const {pathname} = useLocation()
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        {pathname !== '/auth' && <Header/>}
      </div>
      <div className={styles.body}>
        { children }
      </div>
    </div>
  )
}

export default MainLayout;