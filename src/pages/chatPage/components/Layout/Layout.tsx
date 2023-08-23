import styles from './Layout.module.scss';
import { FC } from 'react'
import I from './types';
import getClassNames from '../../../../utils/getClassNames';

const Layout:FC<I> = ({
  leftSide,
  rightSide,
  center
}) => {
  return (
    <div className={styles.wrapper}>
      {leftSide && (
        <div className={getClassNames([styles.part, styles.left])}>
          {leftSide}
        </div>
      )}
      {center && (
        <div className={getClassNames([styles.part, styles.center])}>
          {center}
        </div>
      )}
      {rightSide && (
        <div className={getClassNames([styles.part, styles.right])}>
          {rightSide}
        </div>
      )}
    </div>
  )
}

export default Layout;