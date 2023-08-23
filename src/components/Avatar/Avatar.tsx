import styles from './Avatar.module.scss';
import I from './types';
import { FC, useState } from 'react'
import getClassNames from '../../utils/getClassNames';
import placeholder from '../../assets/avatar-placeholder.png';

const Avatar:FC<I> = ({
  image,
  size = 60, 
  isOnline,
  isRound,
  style
}) => {
  const [loaded, setLoaded] = useState(false)
  return (
    <div 
      className={getClassNames([styles.wrapper, isRound && styles.round, isOnline && styles.online])}>
      <div className={styles.img} style={{...style, width: size, height: size}}>
        <img 
          onLoad={() => setLoaded(true)}
          src={image ?? placeholder} 
          alt="Avatar"/>
        {
          !loaded && <div className={styles.skeleton}></div>
        }
        
      </div>
    </div>
  )
}

export default Avatar;