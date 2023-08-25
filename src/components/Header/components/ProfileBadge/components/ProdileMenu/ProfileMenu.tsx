import styles from './ProfileMenu.module.scss';
import { FC, useState } from 'react'
import getClassNames from '@utils/getClassNames';
import {LoadingOutlined} from '@ant-design/icons';
import {IoExitOutline, IoStatsChart} from 'react-icons/io5';
import unauthorize from '@utils/unauthorize';
import { main_deleteToken } from '@store/slices/mainSlice/mainSlice';
import { useAppDispatch } from '@hooks/useReduxTypedHook';
import { useNavigate } from 'react-router-dom';
import ROUTES from '@data/routes';

type variants = 'danger' | 'default' | 'green'
const ProfileMenu:FC<any> = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [logoutLoad, setLogoutLoad] = useState(false)
  
  const onLogout = () => {  
    setLogoutLoad(true)
    unauthorize()
    dispatch(main_deleteToken())
    setLogoutLoad(true)
  }

  const switchVariant = (variant: variants) => {
    switch(variant) {
      case 'danger':
        return styles.danger
      case 'default':
        return;
      case 'green':
        return styles.green
      default:
        return;
    }
  }  

  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        <li onClick={() => navigate(ROUTES.statPage)} className={getClassNames([styles.item, switchVariant('default')])}>
          <div className={styles.icon}>{<IoStatsChart/>}</div>
          <div className={styles.label}>{'Статистика'}</div>
        </li>
        <li onClick={onLogout} className={getClassNames([styles.item, switchVariant('danger')])}>
          <div className={styles.icon}>{<IoExitOutline/>}</div>
          <div className={styles.label}>{'Выход'}</div>
          { logoutLoad &&  <div className={styles.loading}><LoadingOutlined/></div> }
        </li>
      </ul>
    </div>
  )
}

export default ProfileMenu;