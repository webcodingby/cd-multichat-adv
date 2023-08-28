import styles from './Item.module.scss';
import { FC, useEffect, useState } from 'react'
import placeholder from '@assets/avatars/avatar-1.png';
import getClassNames from '@utils/getClassNames';
import {BsCheck} from 'react-icons/bs'

interface I {
  onSelect?: (...args: any[]) => any,
  id?: string | number,
  img?: string,
  isActive?: boolean,
}

const Item:FC<I> = ({
  onSelect,
  id,
  img,
  isActive,
}) => {
  


  return (
    <div 
      onClick={onSelect}
      className={getClassNames([styles.wrapper, isActive && styles.active])}>
      <div className={styles.mask}><div className={styles.icon}><BsCheck/></div></div>
      <div className={styles.img}>
        <img src={img || placeholder} alt={'img'} />
      </div>
    </div>
  )
}

export default Item;