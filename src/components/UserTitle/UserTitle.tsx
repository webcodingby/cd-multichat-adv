import styles from './UserTitle.module.scss';
import { FC } from 'react'
import I from './types';
import getClassNames from '@utils/getClassNames';

const UserTitle:FC<I> = ({
  name,
  age,
  country,
  state,
  isOnline,
  style
}) => {
  return (
    <div className={getClassNames([styles.wrapper, isOnline && styles.online])} style={style?.wrapperStyle}>
      <div className={getClassNames([styles.main, 'text-ellipsis'])} style={style?.mainStyle}>
        <span>{name}, </span><span>{age}</span>
      </div>
      {
        (state || country) && (
          <div className={getClassNames([styles.location, 'text-ellipsis'])} style={style?.locationStyle}>
            <span>{country}</span>{state && <span>, {state}</span>}
          </div>
        )
      }
    </div>
  )
}

export default UserTitle;