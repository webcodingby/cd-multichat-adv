import { FC } from 'react'
import styles from './Header.module.scss';

import Menu from './components/Menu/Menu';
import WorkPanel from './components/WorkPanel/WorkPanel';
import ProfileBadge from './components/ProfileBadge/ProfileBadge';

const Header:FC<any> = () => {
  return (
    <header className={styles.wrapper}>
      <div className={styles.in}>
        <div className={styles.part}>
          <Menu/>
        </div>
        <div className={styles.part}>
          <WorkPanel/>
        </div>
        <div className={styles.part}>
          <ProfileBadge/>
        </div>
      </div>
    </header>
  )
}

export default Header;