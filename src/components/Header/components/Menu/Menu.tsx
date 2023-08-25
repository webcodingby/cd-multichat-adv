import styles from './Menu.module.scss';
import { FC } from 'react'
import { Link } from 'react-router-dom';
import getClassNames from '../../../../utils/getClassNames';
import { useLocation } from 'react-router-dom';
import ROUTES from '@data/routes';

const Menu:FC<any> = () => {
  const {pathname} = useLocation()

  return (
    <div className={styles.wrapper}>
      <Link 
        className={getClassNames([styles.item, 'scale-effect-on-click', pathname?.includes(ROUTES.chatPage) && styles.active])} 
        to={ROUTES.chatMessagePage}>
      </Link>
      <Link 
        className={getClassNames([styles.item, 'scale-effect-on-click', pathname?.includes(ROUTES.statPage) && styles.active])} 
        to={ROUTES.statPage}>
      </Link>
    </div>
  )
}

export default Menu;