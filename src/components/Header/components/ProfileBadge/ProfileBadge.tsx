import styles from './ProfileBadge.module.scss';
import {FC, useState} from 'react';
import I from './types';
import Avatar from '../../../Avatar/Avatar';
import {FiChevronDown} from 'react-icons/fi'
import getClassNames from '../../../../utils/getClassNames';
import { Cookies } from 'typescript-cookie';
import { cookiesStorageKeys } from '@utils/storageKeys';
import Dropdown from 'antd/es/dropdown/dropdown';

const {ADMIN} = cookiesStorageKeys
const d = Cookies.get(ADMIN)
const userData:any = typeof d === 'string' ? JSON.parse(d) : null

const ProfileBadge:FC = () => {

  return (  
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.email}>{userData?.email}</div>
        <div className={styles.role}>{userData?.role}</div>
      </div> 
      <div className={styles.avatar}>
        <Avatar
          isRound
          />
      </div>
      <Dropdown
        
        >
        <button className={getClassNames([styles.toggle, 'scale-effect-on-click'])}>
          <FiChevronDown/>
        </button>
      </Dropdown>
      
    </div>
  )
}

export default ProfileBadge