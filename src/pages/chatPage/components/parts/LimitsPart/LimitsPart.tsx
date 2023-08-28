import { FC, useEffect, useState } from 'react'
import styles from './LimitsPart.module.scss';
import LimitItem from './components/LimitItem/LimitItem';
import getClassNames from '../../../../../utils/getClassNames';
import Empty from '@components/Empty/Empty';
import { useAppSelector } from '@hooks/useReduxTypedHook';


interface I {
  isActive?: boolean,
}

const LimitsPart:FC<I> = ({
  isActive,
}) => {
  const {chatData} = useAppSelector(s => s.mainSlice)
  const {limits} = chatData || {}
  

  return (
    <div className={getClassNames([styles.wrapper, 'custom-scroll', isActive && styles.active])}>
      {
        limits.map((i,index) => (
          <LimitItem
            {...i}
            key={index}
            />
        ))
      }
    </div>
  )
}

export default LimitsPart;