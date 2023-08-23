import styles from './ProfileMenu.module.scss';
import { FC } from 'react'


const ProfileMenu:FC<any> = () => {

  

  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        <li className={styles.item}></li>
      </ul>
    </div>
  )
}

export default ProfileMenu;