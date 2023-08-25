import { FC, useEffect } from 'react'
import styles from './LimitsPart.module.scss';
import LimitItem from './components/LimitItem/LimitItem';
import {Row, Col} from 'antd';
import getClassNames from '../../../../../utils/getClassNames';
import Empty from '@components/Empty/Empty';
import { useGetLimitsListQuery } from '@store/slices/apiSlice/apiSlice';
import { useAppSelector } from '@hooks/useReduxTypedHook';

interface I {
  isActive?: boolean,
  list: any[]
}

const LimitsPart:FC<I> = ({
  isActive,
  list = []
}) => {

  return (
    <div className={getClassNames([styles.wrapper, 'custom-scroll', isActive && styles.active])}>
      {
        list.map((i,index) => (
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