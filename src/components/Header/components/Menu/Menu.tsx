import styles from './Menu.module.scss';
import { FC } from 'react'
import { Link } from 'react-router-dom';
import getClassNames from '../../../../utils/getClassNames';
import { useLocation } from 'react-router-dom';

const Menu:FC<any> = () => {
  const {pathname} = useLocation()

  return (
    <div className={styles.wrapper}>
      <Link 
        className={getClassNames([styles.item, 'scale-effect-on-click', pathname?.includes('/chat') && styles.active])} 
        to={'/chat?chatType=CHAT'}>
      </Link>
      <Link 
        className={getClassNames([styles.item, 'scale-effect-on-click', pathname?.includes('/dashboard') && styles.active])} 
        to={'/dashboard'}>
      </Link>
    </div>
  )
}

export default Menu;