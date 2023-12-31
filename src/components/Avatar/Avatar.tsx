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
  style,
  isActive,
  isError,
  onClick
}) => {
  const [loaded, setLoaded] = useState(false)
  return (
    <div 
      onClick={onClick}
      className={getClassNames([styles.wrapper, isRound && styles.round, isOnline && styles.online, isActive && styles.active, isError && styles.error])}>
      <div className={styles.img} style={{...style, width: size, height: size}}>
        <img 
          onLoad={() => setLoaded(true)}
          src={(image && !image.includes('cooldremy')) ? image : placeholder} 
          alt="Avatar"/>
        {
          !loaded && <div className={styles.skeleton}>
            <img src={placeholder} alt="" />
          </div>
        }
        
      </div>
    </div>
  )
}

export default Avatar;