import styles from './ProfileBadge.module.scss';
import {FC, useState} from 'react';
import I from './types';
import Avatar from '../../../Avatar/Avatar';
import {FiChevronDown} from 'react-icons/fi'
import getClassNames from '../../../../utils/getClassNames';
import { Cookies } from 'typescript-cookie';
import { cookiesStorageKeys } from '@utils/storageKeys';
import Dropdown from 'antd/es/dropdown/dropdown';
import ProfileMenu from './components/ProdileMenu/ProfileMenu';
import * as L from 'lodash';
import avatar1 from '@assets/avatars/avatar-1.png'
import avatar2 from '@assets/avatars/avatar-2.png'
import avatar3 from '@assets/avatars/avatar-3.png'
import avatar4 from '@assets/avatars/avatar-4.png'
import avatar5 from '@assets/avatars/avatar-5.png'
import avatar6 from '@assets/avatars/avatar-6.png'
import { useAppSelector } from '@hooks/useReduxTypedHook';
const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];
const avatarIndex = L.random(0, avatars.length - 1);

const {ADMIN} = cookiesStorageKeys
const d = Cookies.get(ADMIN)
const userData:any = typeof d === 'string' ? JSON.parse(d) : null

const ProfileBadge:FC = () => {
  const {socket} = useAppSelector(s => s.mainSlice)

  return (  
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.email}>{userData?.email}</div>
        <div className={styles.role}>{userData?.role}</div>
      </div> 
      <div className={styles.avatar}>
        <Avatar
          isRound
          image={avatars[avatarIndex]}
          isActive={socket ? true : false}
          isOnline={socket ? true : false}
          isError={socket ? false : true}
          
          />
      </div>
      <Dropdown
        overlay={
          <ProfileMenu/>
        }
        >
        <button className={getClassNames([styles.toggle, 'scale-effect-on-click'])}>
          <FiChevronDown/>
        </button>
      </Dropdown>
      
    </div>
  )
}

export default ProfileBadge